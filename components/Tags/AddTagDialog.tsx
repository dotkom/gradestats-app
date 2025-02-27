import { ChangeEvent, FC, FormEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { requestCreateCourseTag } from 'common/api/tags';
import { Button } from 'components/common/Button';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { TextInput } from 'components/forms/TextInput';
import { Alert } from 'components/Alert';
import { Label } from 'components/forms/Label';
import { Tag } from 'models/Tag';

import styles from './add-tag-dialog.module.scss';
interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  courseCode: string;
  existingTags: Tag[];
}

type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'COMPLETED';

export const AddTagDialog: FC<Props> = ({ isOpen, closeDialog, courseCode, existingTags }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<Status>('IDLE');
  const [name, setName] = useState('');

  const doesNameAlreadyExist = existingTags.map((tag) => tag.name).includes(name);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('PENDING');
    const response = await requestCreateCourseTag({ courseCode, name });
    if (response.status === 201) {
      setSubmitStatus('COMPLETED');
      setName('');
    } else if (response.status === 400) {
      setSubmitStatus('ERROR');
      setMessages(response.messages || []);
    }
  };

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const clickBackdrop: MouseEventHandler = (event) => {
    if (event.target === ref.current) {
      closeDialog();
    }
  };

  return (
    <dialog
      ref={ref}
      className={styles.container}
      aria-label="Legg til tags"
      onCancel={closeDialog}
      onClick={clickBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <Heading as="h1" size="h3">
          Legg til tags
        </Heading>
        {doesNameAlreadyExist && (
          <Alert type="warning" title={`${name} finnes allerede`}>
            En tag med dette navnet finnes allerede for dette emnet.
          </Alert>
        )}
        {submitStatus === 'ERROR' &&
          messages.map((message) => (
            <Alert key={message} type="error" title="Feil">
              {message}
            </Alert>
          ))}
        {submitStatus === 'COMPLETED' && (
          <Alert type="success" title="Tag opprettet!">
            Taggen ble lagt til, takk for at du bidrar! Det kan ta opptil én time før den vises på siden.
          </Alert>
        )}
        <Text>Gjør det lettere å søke i emner ved å legge til tags!</Text>
        <Text>
          Vi setter veldig stor pris på at du bidrar til å gjøre det lettere å søke i emner. Vennligst vis hensyn ved å
          ikke legge til useriøse forslag. Grunnet tidligere misbruk vil ikke tags modereres før bruk, og ikke lenger
          være synlig offentlig.
        </Text>

        <Label label="Navn">
          <TextInput
            name="tag-name"
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
          <Button type="submit" disabled={status === 'PENDING' || doesNameAlreadyExist}>
            Legg til!
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default AddTagDialog;
