import React from 'react';

export const CheckLabel = ({ label, value }) => {
  return (
    <label>
      {label}{' '}
      {value ? <span className="glyphicon glyphicon-ok"></span> : <span className="glyphicon glyphicon-remove"></span>}
    </label>
  );
};
