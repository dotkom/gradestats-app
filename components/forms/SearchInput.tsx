import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import cx from 'classnames';

import styles from './search-input.module.scss';

type Props = HTMLProps<HTMLInputElement>;

export const SearchInput = forwardRef<HTMLInputElement, Props>(({ className, type = 'text', ...props }, ref) => {
  return <input ref={ref} className={cx(styles.searchInput, className)} type={type} {...props} />;
});

SearchInput.displayName = 'SearchInput';
