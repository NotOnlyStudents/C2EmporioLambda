import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productDeleteErrorId = 'product_delete_error';

function SnackbarDeleteProductError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productDeleteErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      An error occured deleting the selected product
    </EMLSnackbar>
  );
}

export default SnackbarDeleteProductError;
