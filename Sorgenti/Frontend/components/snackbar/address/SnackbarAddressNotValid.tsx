import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressNotValidId = 'address_not_valid';

function SnackbarAddressNotValid({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressNotValidId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Some field doesn't satisfy the minimal requirements
    </EMLSnackbar>
  );
}

export default SnackbarAddressNotValid;
