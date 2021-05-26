import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedMinPrice: number
  selectedMaxPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em 0',
  },
});

function TextfieldMinPrice({
  selectedMinPrice, handleChangeMinPrice,
  selectedMaxPrice,
}:Props) {
  const [value, setValue] = React.useState<number>(selectedMinPrice);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= selectedMaxPrice) {
      handleChangeMinPrice(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedMinPrice);
  }, [selectedMinPrice]);

  return (
    <>
      <TextField
        id="min price"
        label="min price"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={handleChange}
        type="number"
        helperText="Value must be lower than max price"
        placeholder="Min price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      />
    </>
  );
}

export default TextfieldMinPrice;
