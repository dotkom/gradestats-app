import { useState } from 'react';
import useSWR from 'swr';
import { getDepartmentListApiUrl } from 'common/urls';
import { requestKarstatScrapeGradeReport } from 'common/api/karstat';
import { Department } from 'components/Scrapers/Department';

const KarstatScraperPage = () => {
  const { data: departmentsResponse } = useSWR(getDepartmentListApiUrl());
  const [messages, setMessages] = useState([]);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('IDLE'); // 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null); // 'SPRING' | 'SUMMER' | 'AUTUMN'

  const departments = departmentsResponse
    ? departmentsResponse.results.filter((department) => department.faculty !== null)
    : [];

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleYearChange = (event) => {
    setCompletedIds([]);
    setYear(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setCompletedIds([]);
    setSemester(event.target.value);
  };

  const addToCompletedIds = (departmentId) => {
    setCompletedIds((current) => [...current, departmentId]);
  };

  const scrapeGradeReportForDepartment = async (departmentId) => {
    setCurrentDepartmentId(departmentId);
    const response = await requestKarstatScrapeGradeReport({ username, password, departmentId, year, semester });
    if (response.status === 200) {
      addToCompletedIds(departmentId);
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages);
    }
    setCurrentDepartmentId(null);
  };

  const scrapeGradeRaportForSingleDepartment = async (departmentId) => {
    setSubmitStatus('PENDING');
    await scrapeGradeReportForDepartment(departmentId);
    setSubmitStatus('COMPLETED');
  };

  const scrapeGradeRaportForAllDepartments = async (allDepartments, departmentId) => {
    await scrapeGradeReportForDepartment(departmentId);
    const currentIndex = allDepartments.findIndex((department) => department.id === departmentId);
    const nextDepartment = allDepartments[currentIndex + 1];
    if (nextDepartment) {
      await scrapeGradeRaportForAllDepartments(allDepartments, nextDepartment.id);
    }
    setSubmitStatus('COMPLETED');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (departments.length > 0) {
      setSubmitStatus('PENDING');
      await scrapeGradeRaportForAllDepartments(departments, departments[0].id);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Oppdater karakterstatistikk fra Karstat</h1>
          <hr />

          {submitStatus === 'ERROR' &&
            messages.map((message) => (
              <div key={message} className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Feil:</span>
                {message}
              </div>
            ))}
          {submitStatus === 'COMPLETED' && (
            <div className="alert alert-success" role="alert">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              <span className="sr-only">OK</span>
              Emner ble oppdatert
            </div>
          )}

          <div className="form-group">
            <label className="control-label" htmlFor="username">
              NTNU-brukernavn:
            </label>
            <input
              id="username"
              type="username"
              placeholder=""
              className="form-control input-default"
              required={true}
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="password">
              Passord:
            </label>
            <br />
            <small className="text-muted">
              Passordet vil ikke bli lagret på noen måte. Det sendes kun videre for innlogging i NTNU sine tjenester bak
              kulissene.
            </small>
            <input
              id="password"
              type="password"
              placeholder=""
              className="form-control input-default"
              required={true}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="year">
              År:
            </label>
            <input
              id="year"
              type="number"
              className="form-control input-default"
              required={true}
              value={year}
              onChange={handleYearChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="semester">
              Semester:
            </label>
            <br />
            <select
              id="semester"
              className="form-control input-default"
              required={true}
              value={semester}
              onChange={handleSemesterChange}
            >
              <option value="SPRING">Vår</option>
              <option value="SUMMER">Sommer</option>
              <option value="AUTUMN">Høst</option>
            </select>
          </div>
          <button
            name="update-all"
            type="submit"
            className="btn btn-primary align-right"
            disabled={submitStatus === 'PENDING'}
          >
            {submitStatus === 'PENDING' ? 'Oppdaterer...' : 'Oppdater ALLE'}
          </button>
        </form>

        <ul className="list-group">
          {departments.map((department) => (
            <Department
              key={department.id}
              name={department.norwegian_name}
              disabled={submitStatus === 'PENDING'}
              loading={currentDepartmentId === department.id}
              isDone={completedIds.some((completedId) => completedId === department.id)}
              onClick={() => scrapeGradeRaportForSingleDepartment(department.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KarstatScraperPage;
