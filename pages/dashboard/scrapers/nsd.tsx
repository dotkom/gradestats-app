import { ChangeEvent, FC, FormEvent, useState } from 'react';
import useSWR from 'swr';
import { getCourseListApiUrl } from 'common/urls';
import { ListResponse } from 'common/requests';
import { Course } from 'models/Course';
import { Heading } from 'components/Typography/Heading';
import { Alert } from 'components/Alert';
import { Label } from 'components/forms/Label';
import { Select } from 'components/forms/Select';
import { TextInput } from 'components/forms/TextInput';
import { requestNSDScrapeGradeReport } from 'common/api/nsd';
import { Button } from 'components/common/Button';

type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED';
type Semester = 'SPRING' | 'SUMMER' | 'AUTUMN';

const NSDScraperPage: FC = () => {
  const { data: coursesResponse } = useSWR<ListResponse<Course>>(getCourseListApiUrl({ limit: 100000, offset: 0 }));
  const [messages, setMessages] = useState<string[]>([]);
  const [currentCourseCode, setCurrentCourseCode] = useState<string | null>(null);
  const [completedCodes, setCompletedCodes] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<Status>('IDLE');
  const [year, setYear] = useState<number | null>(null);
  const [semester, setSemester] = useState<Semester | null>(null);

  const courses = coursesResponse?.results || [];

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompletedCodes([]);
    setYear(Number(event.target.value));
  };

  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCompletedCodes([]);
    setSemester(event.target.value as Semester);
  };

  const addToCompletedCodes = (courseCode: string) => {
    setCompletedCodes((current) => [...current, courseCode]);
  };

  const scrapeGradeReportForCourse = async (courseCode: string) => {
    setCurrentCourseCode(courseCode);
    const response = await requestNSDScrapeGradeReport({
      courseCode,
      year: year as number,
      semester: semester as string,
    });
    if (response.status === 200) {
      addToCompletedCodes(courseCode);
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages || []);
    }
    setCurrentCourseCode(null);
  };

  const scrapeGradeRaportForSingleCourse = async (courseCode: string) => {
    setSubmitStatus('PENDING');
    await scrapeGradeReportForCourse(courseCode);
    setSubmitStatus('COMPLETED');
  };

  const scrapeGradeRaportForAllCourses = async (allCourses: Course[], courseCode: string) => {
    try {
      await scrapeGradeReportForCourse(courseCode);
      console.log(courseCode);
    } catch {
      console.log('Failed for ' + courseCode);
    }
    const currentIndex = allCourses.findIndex((course) => course.code === courseCode);
    const nextCourse = allCourses[currentIndex + 1];
    if (nextCourse) {
      await scrapeGradeRaportForAllCourses(allCourses, nextCourse.code);
    }
    setSubmitStatus('COMPLETED');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (courses.length > 0) {
      setSubmitStatus('PENDING');
      await scrapeGradeRaportForAllCourses(courses, courses[0].code);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Heading as="h1">Oppdater karakterstatistikk fra NSD</Heading>

        {submitStatus === 'ERROR' &&
          messages.map((message) => (
            <Alert key={message} type="error" title="Feil">
              {message}
            </Alert>
          ))}
        {submitStatus === 'COMPLETED' && (
          <Alert type="success" title="OK">
            Emner ble oppdatert
          </Alert>
        )}

        <Label label="År:">
          <TextInput type="number" required value={String(year)} onChange={handleYearChange} />
        </Label>

        <Label label="Semester:">
          <Select id="semester" required value={semester || ''} onChange={handleSemesterChange}>
            <option value="SPRING">Vår</option>
            <option value="SUMMER">Sommer</option>
            <option value="AUTUMN">Høst</option>
          </Select>
        </Label>

        <Button name="update-all" type="submit" disabled={submitStatus === 'PENDING'}>
          {submitStatus === 'PENDING' ? 'Oppdaterer...' : 'Oppdater ALLE'}
        </Button>
      </form>

      <ul>
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            name={course.norwegian_name}
            disabled={submitStatus === 'PENDING'}
            loading={currentCourseCode === course.code}
            isDone={completedCodes.some((completedCode) => completedCode === course.code)}
            onClick={() => scrapeGradeRaportForSingleCourse(course.code)}
          />
        ))}
      </ul>
    </section>
  );
};

interface CourseItemProps {
  name: string;
  isDone: boolean;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const CourseItem: FC<CourseItemProps> = ({ name, isDone, loading, disabled, onClick }) => {
  return (
    <li>
      {name}
      <span>
        {isDone && <span className="glyphicon glyphicon-ok" aria-hidden="true" />}
        <Button name="update" disabled={disabled || loading} onClick={onClick}>
          {loading ? 'Oppdaterer...' : 'Start oppdatering'}
        </Button>
      </span>
    </li>
  );
};

export default NSDScraperPage;
