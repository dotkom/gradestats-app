import { ListResponse } from 'common/requests';
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
  const [departmentsResponse, facultiesResponse]: [ListResponse<Department>, ListResponse<Faculty>] = await Promise.all(
    [
      fetch(getDepartmentListApiUrl(), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
      fetch(getFacultyListApiUrl(), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
    ]
  );
  const departments = departmentsResponse.results;
  const faculties = facultiesResponse.results;
  return {
    departments,
    faculties,
  };
};
