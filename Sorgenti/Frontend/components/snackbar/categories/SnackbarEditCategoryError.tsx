import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryEditErrorId = 'category_edit_error';

function SnackbarEditCategoryError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryEditErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong deleting the category
    </EMLSnackbar>
  );
}

export default SnackbarEditCategoryError;
