'use client';
import { renderToString } from 'react-dom/server';

import type { Grade } from 'models/Grade';
import type { Course } from 'models/Course';
import { PreviewChart } from './PreviewChart';

export const createPreview = (course: Course, grades: Grade[]) => {
  return renderToString(<PreviewChart grade={grades[0]}></PreviewChart>);
};
