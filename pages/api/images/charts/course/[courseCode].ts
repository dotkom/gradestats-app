import { createPreview } from './../../../../../common/images/preview';
import { NextApiRequest, NextApiResponse } from 'next';

import { getCourseDetailApiUrl, getCourseGradeListApiUrl } from 'common/urls';
import { ListResponse, requests } from 'common/requests';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';

type QueryParams = {
  courseCode: string;
  fileFormat: string;
  a: string;
};

const FILE_FORMAT = 'png';

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const { courseCode } = req.query as QueryParams;
    const course = await requests.get<Course>(getCourseDetailApiUrl(courseCode));
    console.log(course);
    const { results: grades } = await requests.get<ListResponse<Grade>>(getCourseGradeListApiUrl(courseCode));
    console.log(grades);
    const previewSvg = createPreview(course, grades);
    console.log(courseCode);
    console.log(previewSvg);
    res.setHeader('Content-Type', 'text/raw');
    res.status(200).send(previewSvg);
  } catch (error) {
    res.status(404).end();
  }
};

export default handler;
