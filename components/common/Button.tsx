import React, { ButtonHTMLAttributes, FC } from 'react';

import cx from 'classnames';

import styles from './button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<Props> = ({ className, ...props }) => {
  return <button className={cx(className, styles.button)} {...props} />;
};
