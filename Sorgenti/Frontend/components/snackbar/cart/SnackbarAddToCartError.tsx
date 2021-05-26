import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addToCartErrorId = 'add_to_cart_error';

function SnackbarAddToCartError({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addToCartErrorId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      Something went wrong adding a product to cart
    </EMLSnackbar>
  );
}

export default SnackbarAddToCartError;
