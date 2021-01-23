import { forwardRef, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './select.module.scss';

type Props = HTMLProps<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(({ className, ...props }, ref) => {
  return <select ref={ref} className={cx(styles.select, className)} {...props} />;
});

Select.displayName = 'Select';
