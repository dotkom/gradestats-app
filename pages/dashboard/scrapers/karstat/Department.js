import React from 'react';

export const Department = ({ name, disabled, loading, onClick, isDone }) => {
  return (
    <>
      <li className="list-group-item department">
        {name}
        <span>
          {isDone && <span className="glyphicon glyphicon-ok" aria-hidden="true" />}
          <button
            name="update"
            className="btn btn-primary align-right"
            disabled={disabled || loading}
            onClick={onClick}
          >
            {loading ? 'Oppdaterer...' : 'Start oppdatering'}
          </button>
        </span>
      </li>
      <style jsx>{`
        .department {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};
