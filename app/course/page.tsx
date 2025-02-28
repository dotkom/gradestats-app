import { ListResponse, requests } from 'common/requests';
import { getDepartmentListApiUrl, getFacultyListApiUrl } from 'common/urls';
import { Department } from 'models/Department';
import { Faculty } from 'models/Faculty';

import { CourseListPage } from './client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'grades.no - søk',
  description: 'Søk i emner ved NTNU',
};

export default async function Page() {
  const { departments, faculties } = await getProps();

  return <CourseListPage departments={departments} faculties={faculties} />;
}

const getProps = async () => {
  // revalidate: 60 * 60, // Revalidate once each hour.
  const [departmentsResponse, facultiesResponse] = await Promise.all([
    requests.get<ListResponse<Department>>(getDepartmentListApiUrl()),
    requests.get<ListResponse<Faculty>>(getFacultyListApiUrl()),
  ]);
  const departments = departmentsResponse.results;
  const faculties = facultiesResponse.results;
  return {
    departments,
    faculties,
  };
};
