import { forwardRef, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './text-input.module.scss';

type Props = HTMLProps<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Props>(({ className, type = 'text', ...props }, ref) => {
  return <input ref={ref} className={cx(styles.textInput, className)} type={type} {...props} />;
});

TextInput.displayName = 'TextInput';
