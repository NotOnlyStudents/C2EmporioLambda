import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AddressService from 'services/address-service';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

interface Props {
  id: string,
  token: string,
  onRemove: () => void,
}

function AddressRemove({ id, token, onRemove }: Props) {
  const { openSnackbar } = useSnackbarContext();

  const [openModal, setOpenModal] = React.useState(false);

  const handleRemoveProduct = async () => {
    try {
      await (new AddressService()).deleteAddress(token, id);

      openSnackbar(Snackbars.addressDeleteSuccessId);
      onRemove();
    } catch (error) {
      openSnackbar(Snackbars.addressDeleteErrorId);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete this address?</DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpenModal(false); }} color="primary">
            NO
          </Button>
          <Button onClick={handleRemoveProduct} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton color="primary" onClick={() => { setOpenModal(true); }}>
        <Delete />
      </IconButton>
    </>
  );
}

export default AddressRemove;
