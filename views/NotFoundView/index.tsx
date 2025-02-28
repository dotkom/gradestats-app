import { AnimatedFailIcon } from 'components/Graphics/AnimatedFailIcon';
import { ReportDialogButton } from 'components/Report/ReportDialogButton';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { FC } from 'react';

import styles from './not-found-view.module.scss';

interface Props {
  message?: string;
}

export const TEXT = {
  TITLE: 'Stryk, siden ble ikke funnet!',
  DEFAULT_MESSAGE: 'Siden du leter etter finnes ikke. Den har muligens blitt flyttet eller slettet.',
  REPORT_TEXT: 'Mener du dette er en feil setter vi stor pris på om du sier ifra!',
  REPORT_BUTTON: 'Meld feil',
};

export const NotFoundView: FC<Props> = ({ message }) => {
  return (
    <section className={styles.container}>
      <Heading as="h1">{TEXT.TITLE}</Heading>
      <AnimatedFailIcon className={styles.illustration} />
      <Text>
        {message ?? TEXT.DEFAULT_MESSAGE} {TEXT.REPORT_TEXT}
      </Text>
      <ReportDialogButton className={styles.reportButton}>{TEXT.REPORT_BUTTON}</ReportDialogButton>
    </section>
  );
};
