import { Children, ReactElement, ReactNode } from 'react';

const extractTextFromChildren = (element: ReactElement): string[] => {
  return Children.map(element, (child) => {
    if (typeof child === 'string') {
      return child as string;
    }
    if (child && child.props && child.props.children) {
      return extractTextFromChildren(child.props.children);
    }
    return '';
  }).flat();
};

export const extractTextFromElement = (element: ReactNode): string => {
  if (!element) {
    return '';
  } else if (typeof element === 'string') {
    return element;
  } else if (typeof element === 'object') {
    return extractTextFromChildren(element as React.ReactElement).join('');
  } else {
    return String(element);
  }
};
