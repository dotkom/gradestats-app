import { Button } from 'components/common/Button';
import { createRef, FC, MouseEvent, useMemo, useRef } from 'react';
import cx from 'classnames';

import styles from './scrolly.module.scss';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';

interface Props {
  className?: string;
  selectedValue: string;
  values: string[];
  onClick: (value: string) => void;
}

export const Scrolly: FC<Props> = ({ className, selectedValue, values, onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const refs = useMemo(() => {
    return Object.fromEntries(values.map((value) => [value, createRef<HTMLButtonElement>()]));
    // eslint-disable-next-line react-compiler/react-compiler
  }, [String(values)]);

  const scrollButtonToMiddle = (button: HTMLButtonElement) => {
    const scrolly = scrollRef.current;
    if (scrolly) {
      const { width: scrollyWidth } = scrolly.getBoundingClientRect();
      const { width: buttonWidth } = button.getBoundingClientRect();
      const middlePosition = button.offsetLeft - scrolly.offsetLeft - scrollyWidth / 2 + buttonWidth / 2;
      scrolly.scrollTo({ behavior: 'smooth', left: middlePosition });
    }
  };

  const handleClick = (value: string) => (event: MouseEvent<HTMLButtonElement>) => {
    onClick(value);
    const clickedElement = event.target as HTMLButtonElement;
    scrollButtonToMiddle(clickedElement);
  };

  useIsomorphicLayoutEffect(() => {
    const button = refs[selectedValue]?.current;
    if (button) {
      scrollButtonToMiddle(button);
    }
  }, [selectedValue, refs]);

  return (
    <div ref={scrollRef} className={cx(styles.scrollOuter, className)}>
      <div className={styles.scrollInner}>
        {[...values].reverse().map((value) => (
          <Button
            ref={refs[value]}
            className={styles.scrollButton}
            key={value}
            onClick={handleClick(value)}
            active={value === selectedValue}
            invertedActive
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};
