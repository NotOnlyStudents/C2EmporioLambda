import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productEditSuccessId = 'product_edit_success';

function SnackbarEditProductSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productEditSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Product edited successfully
    </EMLSnackbar>
  );
}

export default SnackbarEditProductSuccess;
