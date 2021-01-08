import { Button } from 'components/common/Button';
import React, { FC, MouseEvent, useRef } from 'react';
import cx from 'classnames';

import styles from './scrolly.module.scss';

interface Props {
  className?: string;
  values: string[];
  onClick: (value: string) => void;
}

export const Scrolly: FC<Props> = ({ className, values, onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => (event: MouseEvent<HTMLButtonElement>) => {
    onClick(value);
    const clickedElement = event.target as HTMLButtonElement;
    const scrolly = scrollRef.current;
    if (scrolly) {
      const { width: scrollyWidth } = scrolly.getBoundingClientRect();
      const middlePosition = clickedElement.offsetLeft - scrollyWidth / 2;
      scrolly.scrollTo({ behavior: 'smooth', left: middlePosition });
    }
  };

  return (
    <div ref={scrollRef} className={cx(styles.scrollOuter, className)}>
      <div className={styles.scrollInner}>
        {[...values].reverse().map((value) => (
          <Button className={styles.scrollButton} key={value} onClick={handleClick(value)}>
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};
