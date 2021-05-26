import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const userDeleteSuccessId = 'user_delete_success';

function SnackbarDeleteUserSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={userDeleteSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      User successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarDeleteUserSuccess;
