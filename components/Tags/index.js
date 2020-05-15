import React, { useState } from 'react';

import { useUser } from 'common/hooks/userUser';

import { TagButton } from './TagButton';
import { useRouter } from 'next/router';
import { AddTagDialog } from './AddTagDialog';

export const Tags = ({ tags, courseCode, reloadTags }) => {
  const [user] = useUser();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleClick = () => {
    if (!user) {
      router.push({ pathname: '/login', query: { returnToPath: router.asPath } });
    } else {
      openDialog();
    }
  };

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
      <button type="button" className="btn btn-default" onClick={handleClick}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        Legg til
      </button>
      {!user && (
        <>
          <small className="text-muted">Du må være logget inn for å kunne legge til tags.</small>
          <br />
        </>
      )}
      <AddTagDialog isOpen={showDialog} closeDialog={closeDialog} courseCode={courseCode} reloadTags={reloadTags} />
    </div>
  );
};
