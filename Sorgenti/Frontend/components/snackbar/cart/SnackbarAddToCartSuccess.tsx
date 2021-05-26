import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addToCartSuccessId = 'add_to_cart_success';

function SnackbarAddToCartSuccess({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addToCartSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Product added to cart
    </EMLSnackbar>
  );
}

export default SnackbarAddToCartSuccess;
