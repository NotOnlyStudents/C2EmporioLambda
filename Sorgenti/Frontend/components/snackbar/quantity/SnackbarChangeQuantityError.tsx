import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const changeQuantityErrorId = 'quantity_error';

function SnackbarChangeQuantityError({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={changeQuantityErrorId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      Something went wrong changing quantity
    </EMLSnackbar>
  );
}

export default SnackbarChangeQuantityError;
