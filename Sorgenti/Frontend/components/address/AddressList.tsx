import React from 'react';
import { Address } from 'interfaces/address/address';
import {
  Box,
  Button,
  Dialog,
  FormControl, FormLabel, RadioGroup, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddressEdit from './AddressEdit';
import AddressView from './AddressView';

interface Props {
  addresses: Address[];
  selectedAddress: number,
  handleChangeIndex: (value: number) => void,
  handleChangeAddress: (address: Address, index: number) => void,
  handleRemoveOneAddress: (index: number) => void,
  token: string,
}

function AddressList({
  addresses,
  selectedAddress,
  handleChangeIndex,
  handleChangeAddress,
  handleRemoveOneAddress,
  token,
}: Props) : React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeIndex(+event.target.value);
  };

  const renderAllAddress = (): React.ReactElement[] => addresses.map(
    (address: Address, index: number): React.ReactElement => (
      <AddressView
        key={address.id}
        address={address}
        handleChangeAddress={handleChangeAddress}
        handleRemoveAddress={handleRemoveOneAddress}
        index={index}
        token={token}
      />
    ),
  );

  const renderAddressesIfPresent = (): React.ReactElement => (addresses.length
    ? (
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Addresses</FormLabel>
        <RadioGroup aria-label="address" name="address" value={selectedAddress} onChange={handleChange}>
          {renderAllAddress()}
        </RadioGroup>
      </FormControl>
    )
    : (
      <Typography color="secondary">
        Must insert one address
      </Typography>
    )
  );

  return (
    <Box>
      { renderAddressesIfPresent() }
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Add new address
        </Button>
      </Box>
      <Dialog open={open}>
        <AddressEdit
          creation
          handleChangeAddress={handleChangeAddress}
          handleCloseDialog={handleCloseDialog}
          token={token}
        />
      </Dialog>
    </Box>
  );
}

export default AddressList;
