import React, { useState } from 'react';
import { requestCreateReport } from '../../common/api/reports';

const ReportPage = () => {
  const [messages, setMessages] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('IDLE'); // 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED'
  const [course, setCourse] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleContactEmailChange = (event) => {
    setContactEmail(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus('PENDING');
    const response = await requestCreateReport({ course, contactEmail, description });
    if (response.status === 201) {
      setSubmitStatus('COMPLETED');
      setCourse('');
      setContactEmail('');
      setDescription('');
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Rapporter feil</h1>
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
              <span className="sr-only">Repport mottatt</span>
              Takk for tilbakemeldingen!
            </div>
          )}

          <div className="form-group">
            <label className="control-label" htmlFor="description">
              Beskrivelse:
            </label>
            <textarea
              rows="7"
              id="description"
              className="form-control input-default"
              name="description"
              required={true}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="course">
              Emnekode (valgfritt):
            </label>
            <br />
            <small className="text-muted">Gjelder det et spesifikt emne?</small>
            <input
              id="course"
              type="text"
              placeholder="eks: IT2901"
              className="form-control input-default"
              required={false}
              value={course}
              onChange={handleCourseChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="contact">
              Kontakt e-post (valgfritt):
            </label>
            <br />
            <small className="text-muted">
              Adressen brukes bare for å kunne ta kontakt rundt eventuelle videre spørsmål, eller løsninger på
              problemet.
            </small>
            <input
              id="contact"
              type="text"
              placeholder="eks: ola.nordmann@norge.no"
              className="form-control input-default"
              required={false}
              value={contactEmail}
              onChange={handleContactEmailChange}
            />
          </div>

          <div className="form-group">
            <button name="report" className="btn btn-primary" disabled={submitStatus === 'PENDING'}>
              Send inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
