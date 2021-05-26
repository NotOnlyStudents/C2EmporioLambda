import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryCreateErrorId = 'category_create_error';

function SnackbarCreateCategoryError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryCreateErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong creating the category
    </EMLSnackbar>
  );
}

export default SnackbarCreateCategoryError;
