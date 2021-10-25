import { renderToString } from 'react-dom/server';

import { Grade } from 'models/Grade';
import { Course } from 'models/Course';
import { PreviewChart } from './PreviewChart';

export const createPreview = (course: Course, grades: Grade[]) => {
  return renderToString(<PreviewChart grade={grades[0]}></PreviewChart>);
};
