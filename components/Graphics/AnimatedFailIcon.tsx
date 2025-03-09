import type { FC, SVGProps } from 'react';
import cx from 'classnames';

import styles from './animated-fail-icon.module.scss';

type Props = SVGProps<SVGSVGElement>;

export const AnimatedFailIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg className={cx(className, styles.icon)} {...props} viewBox="0 0 360 192" xmlns="http://www.w3.org/2000/svg">
      <rect y="172" width="360" height="20" rx="6" />
      <rect x="0" y="148" width="50" height="12" rx="6" />
      <rect x="62" y="148" width="50" height="12" rx="6" />
      <rect x="124" y="148" width="50" height="12" rx="6" />
      <rect x="186" y="148" width="50" height="12" rx="6" />
      <rect x="248" y="148" width="50" height="12" rx="6" />
      <rect x="310" y="0" width="50" height="160" rx="6">
        <animate attributeName="height" from="0" to="160" dur="1s" repeatCount="0" />
        <animate attributeName="y" from="160" to="0" dur="1s" repeatCount="0" />
      </rect>
    </svg>
  );
};
