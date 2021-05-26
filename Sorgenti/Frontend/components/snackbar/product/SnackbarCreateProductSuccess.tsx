import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productCreateSuccessId = 'product_create_success';

function SnackbarCreateProductSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productCreateSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Product created
    </EMLSnackbar>
  );
}

export default SnackbarCreateProductSuccess;
