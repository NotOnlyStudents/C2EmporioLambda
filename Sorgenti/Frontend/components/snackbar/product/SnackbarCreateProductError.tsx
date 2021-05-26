import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productCreateErrorId = 'product_create_error';

function SnackbarCreateProductError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productCreateErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      An error occured creating the selected product
    </EMLSnackbar>
  );
}

export default SnackbarCreateProductError;
