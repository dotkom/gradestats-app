import { useDialog } from 'common/hooks/useDialog';
import { Button } from 'components/common/Button';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicReportDialog = dynamic(() => import('./ReportDialog'), { ssr: false });

interface Props {
  className?: string;
  text?: string;
  courseCode?: string;
}

export const ReportDialogButton: FC<Props> = ({ className, courseCode, text, children }) => {
  const [showDialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <Button className={className} onClick={openDialog}>
        {text ?? children ?? 'Meld feil'}
      </Button>
      <DynamicReportDialog isOpen={showDialog} closeDialog={closeDialog} prefillCourseCode={courseCode} />
    </>
  );
};
