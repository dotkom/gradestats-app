import { FC } from 'react';
import cx from 'classnames';

import styles from './carousel-dot.module.scss';

interface Props {
  isActive: boolean;
  activeIndex: number;
}

export const CarouselDot: FC<Props> = ({ isActive }) => {
  return <div className={cx(styles.dot, { [styles.active]: isActive }, 'alice-carousel__dots-item-circle')} />;
};
