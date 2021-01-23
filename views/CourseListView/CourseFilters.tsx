import { ChangeEvent, FC, useEffect, useMemo } from 'react';

import { Label } from 'components/forms/Label';
import { Select } from 'components/forms/Select';
import { CourseSort, COURSE_SORT_NAMES, COURSE_SORT_VALUES } from 'models/Course';
import { Department } from 'models/Department';
import { Faculty } from 'models/Faculty';

import styles from './course-filters.module.scss';

interface Props {
  onOrderingChange: (sortOrder: CourseSort) => void;
  currentOrdering: CourseSort;
  onFacultyFilterChange: (facultyId: number | null) => void;
  onDepartmentFilterChange: (departmentId: number | null) => void;
  currentDepartmentId: number | null;
  departments: Department[];
  currentFacultyId: number | null;
  faculties: Faculty[];
}

export const CourseFilters: FC<Props> = ({
  onOrderingChange,
  currentOrdering,
  onFacultyFilterChange,
  onDepartmentFilterChange,
  currentDepartmentId,
  departments,
  currentFacultyId,
  faculties,
}) => {
  const handleOrderingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onOrderingChange(event.target.value as CourseSort);
  };

  const handleFacultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFacultyFilterChange(Number(event.target.value) || null);
  };

  const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDepartmentFilterChange(Number(event.target.value) || null);
  };

  const departmentsFilteredByFaculty = useMemo(() => {
    const faculty = faculties.find((f) => f.faculty_id === currentFacultyId);
    if (faculty) {
      return departments.filter((department) => department.faculty === faculty.id);
    }
    return departments;
  }, [currentFacultyId, String(faculties.map((f) => f.id))]);

  useEffect(() => {
    if (currentFacultyId) {
      onDepartmentFilterChange(null);
    }
  }, [currentFacultyId]);

  return (
    <div className={styles.menu}>
      <Label label="Sortering">
        <Select onChange={handleOrderingChange} value={currentOrdering}>
          {COURSE_SORT_VALUES.map((value) => (
            <option key={value} value={value}>
              {COURSE_SORT_NAMES[value]}
            </option>
          ))}
        </Select>
      </Label>
      <Label label="Fakultet">
        <Select onChange={handleFacultyChange} value={currentFacultyId ?? 0}>
          <option value={0}>Ikke valgt</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.faculty_id}>
              {`(${faculty.acronym}) ${faculty.norwegian_name}`}
            </option>
          ))}
        </Select>
      </Label>
      <Label label="Institutt">
        <Select onChange={handleDepartmentChange} value={currentDepartmentId ?? 0}>
          <option value={0}>Ikke valgt</option>
          {departmentsFilteredByFaculty.map((department) => (
            <option key={department.id} value={department.id}>
              {`(${department.acronym}) ${department.norwegian_name}`}
            </option>
          ))}
        </Select>
      </Label>
    </div>
  );
};
