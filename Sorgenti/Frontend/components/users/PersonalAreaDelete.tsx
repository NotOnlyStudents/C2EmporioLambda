import React from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogTitle,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { getHomeLink } from 'lib/links';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

function PersonalAreaDelete() {
  const [openModal, setOpenModal] = React.useState(false);
  const { openSnackbar } = useSnackbarContext();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user.deleteUser((error) => {
      if (error) {
        openSnackbar(Snackbars.userDeleteErrorId);
      } else {
        openSnackbar(Snackbars.userDeleteSuccessId);
        router.push(getHomeLink());
      }
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => { setOpenModal(true); }}
        >
          <DeleteIcon />
          Delete your account
        </Button>
      </Box>

      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete your account?</DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpenModal(false); }} color="primary">
            NO
          </Button>
          <Button onClick={handleDeleteAccount} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PersonalAreaDelete;
