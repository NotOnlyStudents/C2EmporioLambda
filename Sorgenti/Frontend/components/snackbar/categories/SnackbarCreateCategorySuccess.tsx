import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryCreateSuccessId = 'category_create_success';

function SnackbarCreateCategorySuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryCreateSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Category successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarCreateCategorySuccess;
