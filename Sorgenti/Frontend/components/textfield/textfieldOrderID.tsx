import React from 'react';
import {
  makeStyles, TextField,
} from '@material-ui/core';

interface Props {
  id: string
  handleChangeOrderId: (id: string) => void;
}

const useStyles = makeStyles({
  price: {
    marginBottom: '0.5em',
    width: '100%',
  },
});

function TextFieldOrderID({
  id, handleChangeOrderId,
}:Props) {
  const [value, setValue] = React.useState<string>(id);
  const classes = useStyles();

  const handleKeyEnter = async (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      handleChangeOrderId(value);
    }
  };

  React.useEffect(() => {
    setValue(id);
  }, [id]);

  return (
    <>
      <TextField
        id="orderId"
        label="Order identifier"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        helperText=""
        placeholder="Order identifier"
        onKeyUp={handleKeyEnter}
      />
    </>
  );
}

export default TextFieldOrderID;
