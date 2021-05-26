import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const removedFromCartSuccessId = 'removed_from_cart_success';

function SnackbarRemoveFromCartSuccess({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={removedFromCartSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Product removed from cart
    </EMLSnackbar>
  );
}

export default SnackbarRemoveFromCartSuccess;
