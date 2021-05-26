import React from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Add, Remove, Save } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  quantity: number;
  handleCounterChange: (counter: number) => void;
}

function PDPFillQuantity({ quantity, handleCounterChange }: Props) {
  const [counter, setCounter] = React.useState(quantity);
  const [error, setError] = React.useState({ quantity: false });

  React.useEffect(() => {
    setCounter(quantity);
  }, [quantity]);

  const handleError = (id: string, err: boolean) => {
    const newError = { ...error };

    newError[id] = err;

    setError(newError);
  };

  const handleCounterMinus = () => {
    setCounter(counter - 1);
  };

  const handleCounterPlus = () => setCounter(counter + 1);

  const renderSaveQuantity = () => (
    quantity !== counter && !error.quantity
      ? (
        <IconButton onClick={() => { handleCounterChange(counter); }}>
          <CheckIcon />
        </IconButton>
      )
      : <></>);

  return (
    <Box display="flex" alignItems="center">
      <IconButton color="secondary" onClick={handleCounterMinus}>
        <Remove />
      </IconButton>
      <TextFieldValidation
        id="quantity"
        handleChange={(value: number) => { setCounter(value); }}
        rules="required|integer"
        type="number"
        setError={handleError}
        value={counter}
        label="Product quantity"
        placeholder="Insert new quantity"
        helperText="Insert new quantity as an integer"
        error={error.quantity}
      />
      <IconButton color="primary" onClick={handleCounterPlus}>
        <Add />
      </IconButton>
      {renderSaveQuantity()}
    </Box>
  );
}

export default PDPFillQuantity;
