import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const userDeleteErrorId = 'user_delete_error';

function SnackbarDeleteUserError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={userDeleteErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong deleting your account
    </EMLSnackbar>
  );
}

export default SnackbarDeleteUserError;
