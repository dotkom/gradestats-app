import { Button } from 'components/common/Button';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import styles from './welcome-message.module.scss';

const DynamicReportDialog = dynamic(() => import('components/Report/ReportDialog'));

const TEXT = {
  TITLE: 'Velkommen til nye grades.no!',
  MESSAGE: `
    Har du ris, ros, eller andre tilbakemeldinger?
    Vi ønsker gjerne å høre hva du mener!
  `,
  CLOSE_MESSAGE: 'Lukk melding',
  REPORT_BUTTON: 'Meld feil',
};

export const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const closeMessage = () => setShowMessage(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return showMessage ? (
    <div className={styles.container}>
      <Heading className={styles.title} as="p" size="h3">
        {TEXT.TITLE}
      </Heading>
      <Text className={styles.message}>{TEXT.MESSAGE}</Text>
      <div className={styles.controls}>
        <Button type="button" onClick={closeMessage}>
          {TEXT.CLOSE_MESSAGE}
        </Button>
        <Button type="button" onClick={openDialog}>
          {TEXT.REPORT_BUTTON}
        </Button>
      </div>
      <DynamicReportDialog isOpen={showDialog} closeDialog={closeDialog} />
    </div>
  ) : null;
};
