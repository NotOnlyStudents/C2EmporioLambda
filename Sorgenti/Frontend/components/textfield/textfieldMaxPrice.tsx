import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedMaxPrice: number
  selectedMinPrice: number
  handleChangeMaxPrice: (maxPrice: number) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em',
  },
});

function TextfieldMaxPrice({
  selectedMaxPrice,
  handleChangeMaxPrice,
  selectedMinPrice,
}:Props) {
  const [value, setValue] = React.useState<number>(selectedMaxPrice);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= selectedMinPrice) {
      handleChangeMaxPrice(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedMaxPrice);
  }, [selectedMaxPrice]);

  return (
    <>
      <TextField
        id="max price"
        label="max price"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={handleChange}
        type="number"
        helperText="Value must be greater than min price"
        placeholder="Max price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      />
    </>
  );
}

export default TextfieldMaxPrice;
