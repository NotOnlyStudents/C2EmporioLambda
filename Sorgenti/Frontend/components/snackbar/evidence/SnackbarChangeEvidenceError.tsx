import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const changeEvidenceErrorId = 'evidence_error';

function SnackbarChangeEvidenceError({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={changeEvidenceErrorId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      Something went wrong changing evidence
    </EMLSnackbar>
  );
}

export default SnackbarChangeEvidenceError;
