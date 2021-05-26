import React from 'react';
import {
  Typography, Box, IconButton,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

interface Props {
  counter: number;
  handleCounterChange: (counter: number) => void;
}

function QuantityManager({ counter, handleCounterChange }: Props) {
  const handleCounterMinus = () => {
    if (counter > 1) handleCounterChange(counter - 1);
  };

  const handleCounterPlus = () => {
    handleCounterChange(counter + 1);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton color="secondary" onClick={handleCounterMinus}>
        <Remove />
      </IconButton>
      <Typography variant="button" display="block">
        {counter}
      </Typography>
      <IconButton color="primary" onClick={handleCounterPlus}>
        <Add />
      </IconButton>
    </Box>
  );
}

export default QuantityManager;
