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
      <button type="button" className="btn btn-default" onClick={handleClick}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        Legg til tags for søking
      </button>
      {!user && (
        <>
          <br />
          <small className="text-muted">Du må være logget inn for å kunne legge til tags.</small>
        </>
      )}
      <AddTagDialog isOpen={showDialog} closeDialog={closeDialog} courseCode={courseCode} reloadTags={reloadTags} />
    </div>
  );
};
