import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const changeQuantitySuccessId = 'quantity_success';

function SnackbarChangeEvidenceSuccess({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={changeQuantitySuccessId}
      handleClose={handleClose}
      severity="success"
      open={open}
    >
      Changed quantity
    </EMLSnackbar>
  );
}

export default SnackbarChangeEvidenceSuccess;
