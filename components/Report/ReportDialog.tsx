import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { requestCreateReport } from 'common/api/reports';
import { Button } from 'components/common/Button';

import styles from './report-dialog.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Label } from 'components/forms/Label';
import { TextInput } from 'components/forms/TextInput';
import { Textarea } from 'components/forms/Textarea';
import { Alert } from 'components/Alert';
import { useUser } from 'common/hooks/useUser';
import { DynamicDialog } from 'components/Dialog/DynamicDialog';

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  prefillCourseCode?: string;
}

type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED';

export const ReportDialog: FC<Props> = ({ isOpen, closeDialog, prefillCourseCode }) => {
  const [user] = useUser();
  const [messages, setMessages] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<Status>('IDLE');
  const [course, setCourse] = useState<string>(prefillCourseCode ?? '');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCourse(event.target.value);
  };

  const handleContactEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      setMessages(response.messages ?? []);
    }
  };

  useEffect(() => {
    if (prefillCourseCode) {
      setCourse(prefillCourseCode);
    }
  }, [prefillCourseCode]);

  useEffect(() => {
    if (user?.email) {
      setContactEmail(user?.email);
    }
  }, [user?.email]);

  return (
    <DynamicDialog isOpen={isOpen} onDismiss={closeDialog} aria-label="Send tilbakemelding">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Heading className={styles.heading} as="h1" size="h3">
          Send tilbakemelding
        </Heading>

        {submitStatus === 'ERROR' &&
          messages.map((message) => (
            <Alert key={message} type="error" title="Feil">
              {message}
            </Alert>
          ))}
        {submitStatus === 'COMPLETED' && (
          <Alert type="success" title="Tilbakemelding mottatt">
            Takk for tilbakemeldingen!
          </Alert>
        )}

        <Label label="Beskrivelse:">
          <Textarea
            rows={7}
            id="description"
            name="description"
            required={true}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Label>

        <Label label="Emnekode (valgfritt):" description="Gjelder det et spesifikt emne?">
          <TextInput
            id="course"
            type="text"
            placeholder="eks: IT2901"
            required={false}
            value={course}
            onChange={handleCourseChange}
          />
        </Label>

        <Label
          label="Kontakt e-post (valgfritt):"
          description="Adressen brukes bare for å kunne ta kontakt rundt eventuelle videre spørsmål, eller løsninger på problemet."
        >
          <TextInput
            id="contact"
            type="text"
            placeholder="eks: ola.nordmann@norge.no"
            required={false}
            value={contactEmail}
            onChange={handleContactEmailChange}
          />
        </Label>

        <div className={styles.buttons}>
          <Button type="reset" onClick={closeDialog}>
            Lukk
          </Button>
          <Button name="report" type="submit" disabled={submitStatus === 'PENDING'}>
            Send inn
          </Button>
        </div>
      </form>
    </DynamicDialog>
  );
};

export default ReportDialog;
