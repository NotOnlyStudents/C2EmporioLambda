import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const statusModifiedId = 'statusModified';

function SnackbarStatusModified({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={statusModifiedId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Status modified with success
    </EMLSnackbar>
  );
}

export default SnackbarStatusModified;
