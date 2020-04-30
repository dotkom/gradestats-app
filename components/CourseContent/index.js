import React from 'react';

export const CourseContent = ({ course }) => {
  const ntnuUrl = `http://www.ntnu.no/studier/emner/${course.code}`;
  return (
    <>
      <h1>
        {course.code} - {course.norwegian_name}
      </h1>
      <h2>Faglig Innhold</h2>
      <p>{course.content || 'Ingen info.'}</p>
      <h2>Læringsmål</h2>
      <p>{course.learning_goal || 'Ingen info.'}</p>
      <hr />
      <a href={ntnuUrl} target="_blank" rel="noopener noreferrer">
        {ntnuUrl}
      </a>
      <hr />
    </>
  );
};
