import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { UserInfo } from 'interfaces/users/users';
import EditIcon from '@material-ui/icons/Edit';
import { getEditPersonalAreaLink } from 'lib/links';
import { Auth } from 'aws-amplify';
import { useAuthContext } from 'lib/authContext';
import { useRouter } from 'next/router';

interface Props {
  seller?: boolean,
}

function PersonalAreaView({ seller }: Props) {
  const { userInfo } = useAuthContext();
  const router = useRouter();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Personal area
        </Typography>
        <IconButton
          onClick={() => { router.push(getEditPersonalAreaLink(seller)); }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" component="h3">
        Name:
      </Typography>
      <Typography gutterBottom>
        { userInfo.name }
      </Typography>
      <Typography variant="h5" component="h3">
        Surname:
      </Typography>
      <Typography gutterBottom>
        { userInfo.surname }
      </Typography>
      <Typography variant="h5" component="h3">
        Email:
      </Typography>
      <Typography gutterBottom>
        { userInfo.email }
      </Typography>
    </>
  );
}

export default PersonalAreaView;
