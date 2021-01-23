import { useState } from 'react';
import { useUser } from 'common/hooks/useUser';
import { requestTIAScrapeCourses } from 'common/api/tia';

const TIAScraperPage = () => {
  const pageSize = 200;
  const [user] = useUser();
  const [messages, setMessages] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('IDLE'); // 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED'
  const [requestCount, setRequestCount] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTIAScrapeCourses = async (skipAmount) => {
    setSubmitStatus('PENDING');
    const response = await requestTIAScrapeCourses(
      { username, password, limit: pageSize, skip: skipAmount },
      user?.token.accessToken
    );
    if (response.status === 200) {
      const isFinished = Array.isArray(response.data) && response.data.length === 0;
      setRequestCount((current) => current + 1);
      if (isFinished) {
        setSubmitStatus('COMPLETED');
      } else {
        await handleTIAScrapeCourses(skipAmount + pageSize);
      }
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleTIAScrapeCourses(0);
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Oppdater data fra NTNU API-et (TIA)</h1>
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
          {submitStatus === 'PENDING' && (
            <div className="alert alert-info" role="alert">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              <span className="sr-only">OK</span>
              {`Oppdaterer emner... ${requestCount * pageSize} fullført.`}
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
          <button
            name="update"
            type="submit"
            className="btn btn-primary align-right"
            disabled={submitStatus === 'PENDING'}
          >
            {submitStatus === 'PENDING' ? 'Oppdaterer...' : 'Oppdater'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TIAScraperPage;
