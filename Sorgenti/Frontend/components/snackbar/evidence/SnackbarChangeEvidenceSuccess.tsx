import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const changeEvidenceSuccessId = 'evidence_success';

function SnackbarChangeEvidenceSuccess({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={changeEvidenceSuccessId}
      handleClose={handleClose}
      severity="success"
      open={open}
    >
      Changed evidence
    </EMLSnackbar>
  );
}

export default SnackbarChangeEvidenceSuccess;
