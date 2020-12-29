import React, { FC, useState } from 'react';
import { useUser } from 'common/hooks/useUser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { Button } from 'components/common/Button';

import styles from './tags.module.scss';

const DynamicAddTagDialog = dynamic(() => import('./AddTagDialog'), { ssr: false });

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
    <div>
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
      <DynamicAddTagDialog isOpen={showDialog} closeDialog={closeDialog} courseCode={courseCode} />
    </div>
  );
};
