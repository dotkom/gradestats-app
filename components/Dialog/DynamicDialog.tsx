import { ComponentProps, FC } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import styles from './dialog.module.scss';

const DynamicReachDialog = dynamic(() => import('@reach/dialog'));

type Props = ComponentProps<typeof DynamicReachDialog>;

export const DynamicDialog: FC<Props> = ({ className, ...props }) => {
  return <DynamicReachDialog className={cx(className, styles.dialog)} {...props} />;
};
