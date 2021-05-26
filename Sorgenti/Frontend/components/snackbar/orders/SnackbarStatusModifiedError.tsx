import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const statusModifiedErrorId = 'statusModifiedError';

function SnackbarStatusModifiedError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={statusModifiedErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      There was some problem with the order
    </EMLSnackbar>
  );
}

export default SnackbarStatusModifiedError;
