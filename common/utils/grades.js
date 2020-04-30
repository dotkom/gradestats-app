export const isKont = (grade) => grade.semester_code.startsWith('S') || grade.semester_code.startsWith('K');
export const isGraded = (grade) => grade.passed === 0;

export const calculateFailureRate = (grade) => {
  let total = 0;
  if (isGraded(grade)) {
    total = grade.a + grade.b + grade.c + grade.d + grade.e + grade.f;
  } else {
    total = grade.passed + grade.f;
  }

  const failureRate = (grade.f / total) * 100;
  return failureRate;
};

export const calculateAverageGrade = (grades) => {
  let average = 0;
  let attendees = 0;
  for (const grade of grades) {
    attendees += grade.attendee_count;
    average += grade.average_grade * grade.attendee_count;
  }
  if (attendees === 0) {
    return 0;
  } else {
    return average / attendees;
  }
};
