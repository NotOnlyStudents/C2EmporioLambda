import {
  Box, FormControl, InputBase, InputLabel, makeStyles, MenuItem, Select, Theme,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';
import { SortOrderType } from 'interfaces/orders/orders';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const BootstrapInput = withStyles((theme: Theme) => createStyles({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

interface Props {
  sort: SortOrderType;
  handleChangeSort: (sort: SortOrderType) => void
}

function SortOrders({
  sort, handleChangeSort,
}: Props) : React.ReactElement {
  const onChangeSort = (event) => {
    handleChangeSort(event.target.value);
  };

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="sort-orders-label">Sort type</InputLabel>
        <Select
          id="sort-orders"
          labelId="sort-orders-label"
          value={sort}
          onChange={onChangeSort}
          input={<BootstrapInput />}
        >
          <MenuItem value={SortOrderType.dataasc}>Ascending date</MenuItem>
          <MenuItem value={SortOrderType.datadesc}>Discending Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortOrders;
