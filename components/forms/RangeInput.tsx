import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import cx from 'classnames';

import styles from './range-input.module.scss';

type Props = HTMLProps<HTMLInputElement>;

export const RangeInput = forwardRef<HTMLInputElement, Props>(({ className, type = 'range', ...props }, ref) => {
  return <input ref={ref} className={cx(styles.rangeInput, className)} type={type} {...props} />;
});

RangeInput.displayName = 'RangeInput';
