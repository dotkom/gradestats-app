import { Dialog } from '@reach/dialog';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { requestCreateCourseTag } from 'common/api/tags';
import { useUser } from 'common/hooks/useUser';
import { Button } from 'components/common/Button';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './add-tag-dialog.module.scss';
import { TextInput } from 'components/forms/TextInput';
import { Alert } from 'components/Alert';
import { Label } from 'components/forms/Label';

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  courseCode: string;
}

type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED';

export const AddTagDialog: FC<Props> = ({ isOpen, closeDialog, courseCode }) => {
  const [user] = useUser();
  const [messages, setMessages] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<Status>('IDLE');
  const [name, setName] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('PENDING');
    const response = await requestCreateCourseTag({ courseCode, name }, user?.token.accessToken as string);
    if (response.status === 201) {
      setSubmitStatus('COMPLETED');
      setName('');
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages || []);
    }
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog} aria-label="Legg til tags">
      <Heading as="h1" size="h3">
        Legg til tags
      </Heading>
      {submitStatus === 'ERROR' &&
        messages.map((message) => (
          <Alert key={message} type="error" title="Feil">
            {message}
          </Alert>
        ))}
      {submitStatus === 'COMPLETED' && (
        <Alert type="success" title="Tilbakemelding mottatt">
          Taggen ble lagt til, takk for at du bidrar! Det kan ta opptil én time før den vises på siden.
        </Alert>
      )}
      <Text>Gjør det lettere å søke i emner ved å legge til tags!</Text>
      <Text>
        Vi setter veldig stor pris på at du bidrar til å gjøre det lettere å søke i emner. Vennligst vis hensyn ved å
        ikke legge til useriøse forslag.
      </Text>
      <form onSubmit={handleSubmit}>
        <Label label="navn">
          <TextInput
            name="tag navn"
            type="text"
            placeholder="Skriv inn et kallenavn eller noe som beskriver emnet"
            required
            value={name}
            onChange={handleNameChange}
          />
        </Label>
        <div className={styles.buttons}>
          <Button type="button" onClick={closeDialog}>
            Lukk
          </Button>
          <Button type="submit">Legg til!</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddTagDialog;
