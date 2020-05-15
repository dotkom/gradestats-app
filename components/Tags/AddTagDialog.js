import { Dialog } from '@reach/dialog';
import React, { useState } from 'react';
import { requestCreateCourseTag } from 'common/api/tags';
import { useUser } from 'common/hooks/userUser';

export const AddTagDialog = ({ isOpen, closeDialog, courseCode }) => {
  const [user] = useUser();
  const [messages, setMessages] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('IDLE'); // 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED'
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus('PENDING');
    const response = await requestCreateCourseTag({ courseCode, name }, user.token.accessToken);
    if (response.status === 201) {
      setSubmitStatus('COMPLETED');
      setName('');
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages);
    }
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog} aria-label="Legg til tags">
      <h3>Legg til tags</h3>
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
          Taggen ble lagt til, takk for at du bidrar! Det kan ta opptil én time før den vises på siden.
        </div>
      )}
      <p>Gjør det lettere å søke i emner ved å legge til tags!</p>
      <p>
        Vi setter veldig stor pris på at du bidrar til å gjøre det lettere å søke i emner. Vennligst vis hensyn ved å
        ikke legge til useriøse forlag.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="tag-name">
            Navn:
          </label>
          <input
            id="tag-name"
            type="text"
            placeholder="Skriv inn et kallenavn eller noe som beskriver emnet"
            className="form-control input-default"
            required={true}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <button type="button" className="btn btn-default" onClick={closeDialog}>
          Lukk
        </button>
        <button type="submit" className="btn btn-success pull-right">
          Legg til!
        </button>
      </form>
    </Dialog>
  );
};
