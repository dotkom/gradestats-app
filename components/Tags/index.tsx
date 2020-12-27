import React, { FC, useState } from 'react';

import { useUser } from 'common/hooks/useUser';

import { useRouter } from 'next/router';
import { AddTagDialog } from './AddTagDialog';
import { Heading } from 'components/Typography/Heading';

import styles from './tags.module.scss';
import { Text } from 'components/Typography/Text';
import { Button } from 'components/common/Button';

interface Props {
  courseCode: string;
}

export const Tags: FC<Props> = ({ courseCode }) => {
  const [user] = useUser();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleClick = () => {
    if (!user) {
      router.push({ pathname: '/login', query: { returnToPath: router.asPath } });
    } else {
      openDialog();
    }
  };

  return (
    <div className={styles.container}>
      <Heading className={styles.header} as="h2">
        Tags
      </Heading>
      <Button type="button" onClick={handleClick}>
        Legg til tags for søking
      </Button>
      {!user && (
        <Text className={styles.loginText}>
          <small>Du må være logget inn for å kunne legge til tags.</small>
        </Text>
      )}
      <AddTagDialog isOpen={showDialog} closeDialog={closeDialog} courseCode={courseCode} />
    </div>
  );
};
