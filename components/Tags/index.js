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
      </ul>
    </div>
  );
};
