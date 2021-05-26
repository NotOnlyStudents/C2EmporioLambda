import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryDeleteErrorId = 'category_delete_error';

function SnackbarDeleteCategoryError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryDeleteErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong deleting the category
    </EMLSnackbar>
  );
}

export default SnackbarDeleteCategoryError;
