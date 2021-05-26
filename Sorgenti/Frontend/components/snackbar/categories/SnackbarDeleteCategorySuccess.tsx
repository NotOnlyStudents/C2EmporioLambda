import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryDeleteSuccessId = 'category_delete_success';

function SnackbarDeleteCategorySuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryDeleteSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Category successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarDeleteCategorySuccess;
