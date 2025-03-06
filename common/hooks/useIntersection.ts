'use client';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type Ref = RefObject<HTMLDivElement>;
export type Entry = IntersectionObserverEntry;

export const useIntersection = (
  callback?: () => void,
  options?: IntersectionObserverInit
): RefObject<HTMLDivElement | null> => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [observerEntry, setEntry] = useState<Entry | null>(null);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [firstEntry] = entries;
      setEntry(firstEntry);
    }, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    setCount((oldCount) => oldCount + 1);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (observerEntry?.isIntersecting && count !== 0) {
      callback?.();
    }
    setCount((current) => current + 1);
  }, [observerEntry]);

  return targetRef;
};
