import React from 'react';
import {
  makeStyles, TextField,
} from '@material-ui/core';

interface Props {
  customer: string
  disabled: boolean,
  handleChangeCustomer: (customerEmail: string) => void;
}

const useStyles = makeStyles({
  price: {
    marginBottom: '0.5em',
    width: '100%',
  },
});

function TextFieldCustomerEmail({
  customer, disabled, handleChangeCustomer,
}:Props) {
  const [value, setValue] = React.useState<string>(customer);
  const classes = useStyles();

  const handleKeyEnter = async (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      handleChangeCustomer(value);
    }
  };

  React.useEffect(() => {
    setValue(customer);
  }, [customer]);

  return (
    <>
      <TextField
        id="customerEmail"
        label="Email of customer"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="email"
        helperText="Text will be disabled when an ID is present"
        placeholder="Customer email"
        onKeyUp={handleKeyEnter}
        disabled={disabled}
      />
    </>
  );
}

export default TextFieldCustomerEmail;
