import { Box, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { UserInfo } from 'interfaces/users/users';
import { CognitoCustomAttributes, useAuthContext } from 'lib/authContext';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { getPersonalAreaLink } from 'lib/links';
import { SignedState } from 'interfaces/login';

function PersonalAreaEdit() {
  const { userInfo, setUserInfo, signedState } = useAuthContext();
  const router: NextRouter = useRouter();

  const [info, setInfo] = React.useState<UserInfo>({
    name: '',
    surname: '',
    email: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [validation, setValidation] = React.useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  React.useEffect(() => {
    setInfo({
      ...info,
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.email,
    });
    setValidation({
      ...validation,
      name: false,
      surname: false,
      email: false,
    });
  }, [userInfo]);

  const setError = (id: string, error: boolean) => {
    const newValidaiton = validation;

    validation[id] = error;

    setValidation(newValidaiton);
  };

  const handleChangeName = (name: string) => {
    setInfo({ ...info, name });
  };

  const handleChangeSurname = (surname: string) => {
    setInfo({ ...info, surname });
  };

  const handleChangeEmail = (email: string) => {
    setInfo({ ...info, email });
  };

  const handleChangeOldPassword = (oldPassword: string) => {
    setInfo({ ...info, oldPassword });
  };

  const handleChangePassword = (password: string) => {
    setInfo({ ...info, password });

    if (password) {
      const samePassword = password !== info.confirmPassword;

      const equals = (samePassword ? 1 : 0) ^ (validation.confirmPassword ? 1 : 0);

      if (equals) {
        setError('confirmPassword', samePassword);
      }
    } else {
      setError('confirmPassword', false);
    }
  };

  const handleChangeConfirmPassword = (confirmPassword: string) => {
    setInfo({ ...info, confirmPassword });

    const samePassword = confirmPassword !== info.password;

    const equals = (samePassword ? 1 : 0) ^ (validation.confirmPassword ? 1 : 0);

    if (equals) {
      setError('confirmPassword', samePassword);
    }
  };

  const checkValidation = () => (Object.values(validation).every((val: boolean) => !val));

  const handleClickCancel = () => {
    router.back();
  };

  const handleClickSave = async () => {
    if (checkValidation) {
      const newAttributes: { [key: string]: string } = { };
      const newUserInfo: UserInfo = {};

      if (info.name !== userInfo.name) {
        newAttributes[CognitoCustomAttributes.name] = info.name;
        newUserInfo.name = info.name;
      }

      if (info.surname !== userInfo.surname) {
        newAttributes[CognitoCustomAttributes.surname] = info.surname;
        newUserInfo.surname = info.surname;
      }

      if (info.email !== userInfo.email) {
        newAttributes.email = info.email;
        newUserInfo.email = info.email;
      }

      if (newAttributes) {
        try {
          const user = await Auth.currentAuthenticatedUser();

          await Auth.updateUserAttributes(user, newAttributes);
        } catch (error) {
          console.error(error);
        }
      }

      if (info.oldPassword) {
        try {
          const user = await Auth.currentAuthenticatedUser();

          await Auth.changePassword(user, info.oldPassword, info.password);
        } catch (error) {
          console.error(error);
        }
      }

      setUserInfo({
        ...userInfo,
        ...newUserInfo,
      });

      router.push(getPersonalAreaLink(signedState === SignedState.Seller));
    } else {
      // TODO Doing snackbar
    }
  };

  return (
    <>
      <TextFieldValidation
        id="name"
        label="Name"
        placeholder="Insert your name"
        helperText="Required name"
        value={info.name}
        fullWidth
        margin="normal"
        handleChange={handleChangeName}
        setError={setError}
        error={validation.name}
        rules="required"
      />

      <TextFieldValidation
        id="surname"
        label="Surname"
        placeholder="Insert your surname"
        helperText="Required surname"
        value={info.surname}
        fullWidth
        margin="normal"
        handleChange={handleChangeSurname}
        setError={setError}
        error={validation.surname}
        rules="required"
      />

      <TextFieldValidation
        id="email"
        label="Email"
        placeholder="Insert your email"
        helperText="Required email"
        value={info.email}
        fullWidth
        margin="normal"
        handleChange={handleChangeEmail}
        setError={setError}
        error={validation.email}
        rules="required|email"
      />

      <TextFieldValidation
        id="oldPassword"
        label="Old password"
        type="password"
        placeholder="Insert your old password to change it or keep it empty if you don't want to do it"
        helperText=""
        value={info.oldPassword}
        fullWidth
        margin="normal"
        handleChange={handleChangeOldPassword}
      />

      <TextFieldValidation
        id="password"
        label="Password"
        type="password"
        placeholder="Insert your new password"
        helperText=""
        value={info.password}
        fullWidth
        margin="normal"
        handleChange={handleChangePassword}
        setError={setError}
        error={validation.password}
      />

      <TextFieldValidation
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Insert again your password to confirm it"
        value={info.confirmPassword}
        fullWidth
        margin="normal"
        handleChange={handleChangeConfirmPassword}
        error={validation.confirmPassword}
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="secondary" onClick={handleClickCancel}>
          <HighlightOffIcon />
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickSave}>
          <CheckIcon />
          Save
        </Button>
      </Box>
    </>
  );
}

export default PersonalAreaEdit;
