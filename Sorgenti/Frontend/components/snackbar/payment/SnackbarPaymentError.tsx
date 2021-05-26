import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const paymentErrorId = 'payment_error';

function SnackbarPaymentError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={paymentErrorId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      An error occured during the payment
    </EMLSnackbar>
  );
}

export default SnackbarPaymentError;
