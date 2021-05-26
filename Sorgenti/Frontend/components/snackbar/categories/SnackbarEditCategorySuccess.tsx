import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryEditSuccessId = 'category_edit_success';

function SnackbarEditCategorySuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryEditSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Category successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarEditCategorySuccess;
