import { FC } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { Button } from 'components/common/Button';

import styles from './tags.module.scss';
import { useDialog } from 'common/hooks/useDialog';
import { Tag } from 'models/Tag';
import { useSession } from 'next-auth/react';

const DynamicAddTagDialog = dynamic(() => import('./AddTagDialog'), { ssr: false });

interface Props {
  courseCode: string;
  tags: Tag[];
}

export const Tags: FC<Props> = ({ courseCode, tags }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [showDialog, openDialog, closeDialog] = useDialog(false);

  const handleClick = () => {
    if (!session?.user) {
      router.push(`/login?returnToPath=${path}`);
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
      {!session?.user && (
        <Text className={styles.loginText}>
          <small>Du må være logget inn for å kunne legge til tags.</small>
        </Text>
      )}
      <DynamicAddTagDialog isOpen={showDialog} closeDialog={closeDialog} courseCode={courseCode} existingTags={tags} />
    </div>
  );
};
