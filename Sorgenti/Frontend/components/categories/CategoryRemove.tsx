import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CategoryService from 'services/category-service';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import { getAuthToken } from 'lib/authContext';

interface Props {
  id: string,
  onRemove: () => void
}

function CategoryRemove({ id, onRemove }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickRemove = async () => {
    try {
      const token: string = await getAuthToken();

      await (new CategoryService()).removeCategory(token, id);
      openSnackbar(Snackbars.categoryDeleteSuccessId);
      onRemove();
    } catch (error) {
      openSnackbar(Snackbars.categoryDeleteErrorId);
    }
  };

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete this category?</DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpenModal(false); }} color="primary">
            NO
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={handleClickRemove}
          >
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

export default CategoryRemove;
