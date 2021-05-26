import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressCreateErrorId = 'address_create_error';

function SnackbarCreateAddressError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressCreateErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong creating the address
    </EMLSnackbar>
  );
}

export default SnackbarCreateAddressError;
