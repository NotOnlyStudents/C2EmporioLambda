import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressCreateSuccessId = 'address_create_success';

function SnackbarCreateAddressSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressCreateSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Address successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarCreateAddressSuccess;
