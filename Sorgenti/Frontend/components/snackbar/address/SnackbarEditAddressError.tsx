import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressEditErrorId = 'address_edit_error';

function SnackbarEditAddressError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressEditErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong deleting the address
    </EMLSnackbar>
  );
}

export default SnackbarEditAddressError;
