import React from 'react';
import { TagButton } from './TagButton';

export const Tags = ({ tags }) => {
  return (
    <div className="well">
      <h4>Tags</h4>
      <ul className="nav nav-list">
        <li>
          <div className="tags">
            {tags.map((tag) => (
              <TagButton key={tag.name} tag={tag} />
            ))}
          </div>
        </li>
        <li>
          <form className="form-inline" action="tags/add/" method="POST">
            <input name="tag" type="text" placeholder="tag (maks 32 tegn)" className="form-control input-sm" />
            <button type="submit" className="btn btn-sm btn-primary">
              Legg til
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};
