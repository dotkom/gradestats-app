import React, { forwardRef, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './textarea.module.scss';

type Props = HTMLProps<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={cx(styles.textarea, className)} {...props} />;
});

Textarea.displayName = 'Textarea';
