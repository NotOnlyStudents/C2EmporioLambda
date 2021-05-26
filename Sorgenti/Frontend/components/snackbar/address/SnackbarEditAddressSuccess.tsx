import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressEditSuccessId = 'address_edit_success';

function SnackbarEditAddressSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressEditSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Address successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarEditAddressSuccess;
