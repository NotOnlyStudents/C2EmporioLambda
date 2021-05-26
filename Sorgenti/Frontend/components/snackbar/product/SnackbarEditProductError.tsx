import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productEditErrorId = 'product_edit_error';

function SnackbarEditProductError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productEditErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      An error occured editing the selected product
    </EMLSnackbar>
  );
}

export default SnackbarEditProductError;
