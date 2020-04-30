import React from 'react';

import { CheckLabel } from './CheckLabel';

export const Facts = ({ course }) => {
  return (
    <div className="well">
      <ul className="nav nav-list">
        <li>
          <label>Studiepoeng: {course.credit}</label>
        </li>
        <li>
          <label>Nivå: {course.course_level}</label>
        </li>
        <li>
          <CheckLabel label="Vår:" value={course.taught_in_spring} />
        </li>
        <li>
          <CheckLabel label="Høst:" value={course.taught_in_autumn} />
        </li>
        <li>
          <CheckLabel label="Engelsk undervisning:" value={course.taught_in_english} />
        </li>
      </ul>
    </div>
  );
};
