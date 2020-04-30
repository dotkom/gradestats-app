import React from 'react';

export const Averages = ({ totalAverage, gradeAverage }) => {
  return (
    totalAverage > 0 && (
      <ul className="nav nav-list">
        <li>
          Snittkarakter: <label id="average-grade">{gradeAverage.toFixed(2)}</label>
        </li>
        <li>
          Totalt snitt: <label id="total-average-grade">{totalAverage.toFixed(2)}</label>
        </li>
      </ul>
    )
  );
};
