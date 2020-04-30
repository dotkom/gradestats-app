const semesterLetters = { V: 0.1, S: 0.2, K: 0.2, H: 0.3 };

export const sortSemesters = (gradeA, gradeB) => {
  gradeA.extra = semesterLetters[gradeA.semester_code.slice(0, 1)];
  gradeB.extra = semesterLetters[gradeB.semester_code.slice(0, 1)];
  gradeA.int = parseInt(gradeA.semester_code.slice(1, 5), 10);
  gradeB.int = parseInt(gradeB.semester_code.slice(1, 5), 10);
  return gradeA.int + gradeA.extra - (gradeB.int + gradeB.extra);
};
