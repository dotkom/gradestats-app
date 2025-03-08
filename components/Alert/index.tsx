import type { FC, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './alert.module.scss';
import { Heading } from 'components/Typography/Heading';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface Props {
  title?: string;
  type: AlertType;
  className?: string;
  isClosable?: boolean;
  onClose?: () => void;
}

const COLOR_CLASSES: Record<AlertType, string> = {
  info: styles.infoColors,
  success: styles.successColors,
  warning: styles.warningColors,
  error: styles.errorColors,
};

export const Alert: FC<PropsWithChildren<Props>> = ({
  className,
  title,
  type,
  isClosable = false,
  onClose,
  children,
}) => {
  const handleClose = () => {
    onClose?.();
  };
  return (
    <div className={cx(styles.alert, COLOR_CLASSES[type], className)}>
      {title ? (
        <Heading className={styles.heading} as="p" size="h4">
          {title}
        </Heading>
      ) : null}
      {children}
      {isClosable ? (
        <button onClick={handleClose} type="button">
          X
        </button>
      ) : null}
    </div>
  );
};
