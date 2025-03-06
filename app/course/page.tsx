import { ListResponse, requests } from 'common/requests';
import { getDepartmentListApiUrl, getFacultyListApiUrl } from 'common/urls';
import { Department } from 'models/Department';
import { Faculty } from 'models/Faculty';

import { CourseListPage } from './client';
import { Suspense } from 'react';

export default async function Page() {
  const { departments, faculties } = await getProps();

  return (
    <>
      <title>grades.no - søk</title>
      <meta property="description" content="Søk i emner ved NTNU" />
    <Suspense>
      <CourseListPage departments={departments} faculties={faculties} />
    </Suspense>
    </>
  );
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
