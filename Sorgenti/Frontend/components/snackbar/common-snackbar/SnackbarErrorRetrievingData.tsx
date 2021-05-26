import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const errorRetrievingDataId = 'error_retrieving_data';

function SnackbarErrorRetrievingData({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={errorRetrievingDataId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      Something went wrong retrieving data
    </EMLSnackbar>
  );
}

export default SnackbarErrorRetrievingData;
