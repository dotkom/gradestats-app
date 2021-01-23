import { useIntersection } from 'common/hooks/useIntersection';
import { AnimatedGraphIcon } from 'components/Graphics/AnimatedGraphIcon';
import { Text } from 'components/Typography/Text';
import { FC } from 'react';

import styles from './infinite-loading.module.scss';

interface Props {
  isLoading: boolean;
  triggerNextPage: () => void;
}

export const InifiniteLoading: FC<Props> = ({ isLoading, triggerNextPage }) => {
  const ref = useIntersection(triggerNextPage);
  return (
    <>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <AnimatedGraphIcon className={styles.loadingIcon} />
          <Text>Laster...</Text>
        </div>
      )}
      <span ref={ref} />
    </>
  );
};
