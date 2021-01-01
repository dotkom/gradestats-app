import { useDialog } from 'common/hooks/useDialog';
import { Button } from 'components/common/Button';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const DynamicReportDialog = dynamic(() => import('./ReportDialog'), { ssr: false });

interface Props {
  className?: string;
  courseCode: string;
}

export const ReportCourseButton: FC<Props> = ({ className, courseCode }) => {
  const [showDialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <Button className={className} onClick={openDialog}>
        Meld feil eller send tilbakemelding om emnet
      </Button>
      <DynamicReportDialog isOpen={showDialog} closeDialog={closeDialog} prefillCourseCode={courseCode} />
    </>
  );
};
