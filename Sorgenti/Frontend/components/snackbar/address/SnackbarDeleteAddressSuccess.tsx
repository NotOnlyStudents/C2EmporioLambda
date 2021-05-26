import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressDeleteSuccessId = 'address_delete_success';

function SnackbarDeleteAddressSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressDeleteSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Address successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarDeleteAddressSuccess;
