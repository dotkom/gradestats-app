import { Button } from 'components/common/Button';
import dynamic from 'next/dynamic';
import React, { FC, useCallback, useState } from 'react';

const DynamicReportDialog = dynamic(() => import('./ReportDialog'));

interface Props {
  className?: string;
  courseCode: string;
}

export const ReportCourseButton: FC<Props> = ({ className, courseCode }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  const openDialog = useCallback(() => {
    setShowDialog(true);
  }, []);

  return (
    <>
      <Button className={className} onClick={openDialog}>
        Meld feil eller send tilbakemelding om emnet
      </Button>
      <DynamicReportDialog isOpen={showDialog} closeDialog={closeDialog} prefillCourseCode={courseCode} />
    </>
  );
};
