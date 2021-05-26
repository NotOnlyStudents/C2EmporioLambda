import React from 'react';
import {
  Box,
  Grid,
  makeStyles, TextField,
  IconButton,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';

import MomentUtils from '@date-io/moment';
import moment from 'moment';

interface Props {
  selectedStartDate: string,
  selectedEndDate: string,
  disabled: boolean,
  handleChangeEnd: (end: string) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
  clearIcon: {
    transform: 'translate(-125%, 42%)',
    width: 'auto',
  },
});

function TextfieldEndDate({
  selectedStartDate,
  handleChangeEnd,
  disabled,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<moment.Moment>(
    selectedEndDate ? moment(selectedEndDate) : null,
  );
  const classes = useStyles();

  const handleChange = (date: moment.Moment) => {
    if (date !== null) {
      date = date.endOf('day');
      handleChangeEnd(date.toISOString());
    } else {
      handleChangeEnd('');
    }
    setValue(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Box>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Search end date"
          placeholder="Insert end date"
          format="DD/MM/yyyy"
          value={value}
          minDate={moment(selectedStartDate)}
          disabled={disabled}
          InputAdornmentProps={{ position: 'start' }}
          onChange={(date) => handleChange(date)}
        />
        <IconButton
          size="small"
          className={classes.clearIcon}
          disabled={disabled}
          onClick={() => handleChange(null)}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </MuiPickersUtilsProvider>
  );
}

export default TextfieldEndDate;
