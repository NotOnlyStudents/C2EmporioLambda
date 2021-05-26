import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productDeleteSuccessId = 'product_delete_success';

function SnackbarDeleteProductSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productDeleteSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Product deleted
    </EMLSnackbar>
  );
}

export default SnackbarDeleteProductSuccess;
