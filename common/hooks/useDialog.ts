import { useState, useCallback } from 'react';

export const useDialog = (initialValue = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);
  return [isOpen, openDialog, closeDialog] as [typeof isOpen, typeof openDialog, typeof closeDialog];
};
