import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import AddressService from 'services/address-service';
import AddressServiceType from 'services/address-service/AddressService';
import { Address, AddressValidation } from 'interfaces/address/address';
import { SnackbarContext, Snackbars } from 'lib/SnackbarContext';

interface Props {
  address?: Address,
  creation?: boolean,
  index?: number,
  handleChangeAddress: (address: Address, index: number) => void,
  handleCloseDialog: () => void,
  token: string
}

interface State {
  address: Address;
  validation: AddressValidation;
}

class AddressEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const emptyAddress: Address = {
      nation: '',
      city: '',
      address: '',
      cap: 0,
    };

    this.state = {
      address: props.address || emptyAddress,
      validation: {
        nation: false,
        city: false,
        address: false,
        cap: false,
      },
    };
  }

  handleChangeNation = (nation: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.nation = nation;

      return newState;
    });
  };

  handleChangeCity = async (city: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.city = city;

      return newState;
    });
  };

  handleChangeCap = (cap: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.cap = parseInt(cap);

      return newState;
    });
  };

  handleChangeAddress = (address: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.address = address;

      return newState;
    });
  };

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.validation[id] = error;

      return newState;
    });
  };

  checkValidation = () => {
    const { validation } = this.state;

    return Object.values(validation).every(
      (val: boolean) => (!val),
    );
  };

  handleClickCancel = () => {
    this.props.handleCloseDialog();
  };

  handleClickSave = async () => {
    const { openSnackbar } = this.context;

    if (this.checkValidation()) {
      const { address } = this.state;
      const { token, index, creation } = this.props;

      let newAddress: Address;

      const addressService: AddressServiceType = new AddressService();

      if (creation) {
        delete address.id;
        try {
          newAddress = await addressService.createAddress(token, address);
          this.props.handleChangeAddress(newAddress, -1);
          openSnackbar(Snackbars.addressCreateSuccessId);
        } catch (e) {
          openSnackbar(Snackbars.addressCreateErrorId);
        }
      } else {
        try {
          newAddress = await addressService.editAddress(token, address.id, address);
          this.props.handleChangeAddress(newAddress, index);
          openSnackbar(Snackbars.addressEditSuccessId);
        } catch (e) {
          openSnackbar(Snackbars.addressEditErrorId);
        }
      }

      this.props.handleCloseDialog();
    } else {
      openSnackbar(Snackbars.addressNotValidId);
    }
  };

  render() {
    const { address, validation } = this.state;
    const { creation } = this.props;
    return (
      <Card id={address.id}>
        <CardHeader title={(creation) ? 'Add new address' : 'Edit your address'} />
        <CardContent>
          <TextFieldValidation
            id="nation"
            label="Nation"
            placeholder="Insert nation"
            value={address.nation}
            fullWidth
            margin="normal"
            helperText="Nation is required"
            handleChange={this.handleChangeNation}
            setError={this.setError}
            error={validation.nation}
            rules="required"
          />
          <TextFieldValidation
            id="city"
            label="city"
            placeholder="Insert city"
            value={address.city}
            margin="normal"
            error={validation.city}
            setError={this.setError}
            handleChange={this.handleChangeCity}
            rules="required"
            helperText="City is required"
          />
          <TextFieldValidation
            id="address"
            label="address"
            placeholder="Insert address"
            value={address.address}
            margin="normal"
            error={validation.address}
            setError={this.setError}
            handleChange={this.handleChangeAddress}
            rules="required"
            helperText="Address is required"
          />
          <TextFieldValidation
            id="cap"
            label="cap"
            placeholder="Insert CAP"
            value={address.cap}
            type="number"
            margin="normal"
            helperText="CAP is required"
            setError={this.setError}
            handleChange={this.handleChangeCap}
            rules="required|numeric"
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickCancel}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

AddressEdit.contextType = SnackbarContext;

export default AddressEdit;
