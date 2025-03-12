import { createPreview } from '../../../../../../../common/images/preview';

import { getCourseDetailApiUrl, getCourseGradeListApiUrl } from 'common/urls';
import type { ListResponse } from 'common/requests';
import { requests } from 'common/requests';
import type { Course } from 'models/Course';
import type { Grade } from 'models/Grade';

export const GET = async (req: Request) => {
  const searchParams = new URLSearchParams(req.url);
  try {
    const courseCode = searchParams.get('courseCode')!;
    const course = await requests.get<Course>(getCourseDetailApiUrl(courseCode));
    console.log(course);
    const { results: grades } = await requests.get<ListResponse<Grade>>(getCourseGradeListApiUrl(courseCode));
    console.log(grades);
    const previewSvg = createPreview(course, grades);
    console.log(courseCode);
    console.log(previewSvg);

    return new Response(previewSvg, { status: 200, headers: { 'Content-Type': 'text/raw' } });
  } catch (error) {
    console.log(error);

    return new Response(null, { status: 404 });
  }
};
