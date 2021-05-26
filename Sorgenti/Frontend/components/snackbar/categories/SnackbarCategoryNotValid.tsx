import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const categoryNotValidId = 'validation_category';

function SnackbarCategoryNotValid({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={categoryNotValidId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Some field doesn't satisfy the minimal requirements
    </EMLSnackbar>
  );
}

export default SnackbarCategoryNotValid;
