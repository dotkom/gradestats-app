import React from 'react';

export const Averages = ({ totalAverage, gradeAverage }) => {
  return (
    totalAverage > 0 && (
      <ul className="nav nav-list">
        <li>
          Snittkarakter: <label>{gradeAverage.toFixed(2)}</label>
        </li>
        <li>
          Totalt snitt: <label>{totalAverage.toFixed(2)}</label>
        </li>
      </ul>
    )
  );
};
