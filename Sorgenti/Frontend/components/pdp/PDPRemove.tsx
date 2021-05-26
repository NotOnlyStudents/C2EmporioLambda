import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete, Remove } from '@material-ui/icons';
import ProductService from 'services/product-service';
import { useRouter } from 'next/router';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import { getPLPLink } from 'lib/links';
import { getAuthToken } from 'lib/authContext';

interface Props {
  id: string,
}

function PDPRemove({ id }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const router = useRouter();

  const { openSnackbar } = useSnackbarContext();

  const handleRemoveProduct = async () => {
    try {
      const token: string = await getAuthToken();

      await (new ProductService()).deleteProduct(token, id);

      openSnackbar(Snackbars.productDeleteSuccessId);

      router.push(getPLPLink(true));
    } catch (error) {
      openSnackbar(Snackbars.productDeleteErrorId);
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
        <DialogTitle id="alert-dialog-title">Are you sure to delete this product?</DialogTitle>
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

export default PDPRemove;
