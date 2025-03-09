import type { ListResponse } from 'common/requests';
import { getDepartmentListApiUrl, getFacultyListApiUrl } from 'common/urls';
import type { Department } from 'models/Department';
import type { Faculty } from 'models/Faculty';

import { CourseListPage } from './client';

export default async function Page() {
  const [departmentsResponse, facultiesResponse]: [ListResponse<Department>, ListResponse<Faculty>] = await Promise.all(
    [
      fetch(getDepartmentListApiUrl(), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
      fetch(getFacultyListApiUrl(), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
    ]
  );
  const departments = departmentsResponse.results;
  const faculties = facultiesResponse.results;

  return (
    <>
      <title>grades.no - søk</title>
      <meta property="description" content="Søk i emner ved NTNU" />
      <CourseListPage departments={departments} faculties={faculties} />
    </>
  );
}
