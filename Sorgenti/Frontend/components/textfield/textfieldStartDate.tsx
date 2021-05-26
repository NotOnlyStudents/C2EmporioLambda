import React from 'react';
import {
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

interface Props {
  selectedStartDate: string,
  selectedEndDate: string,
  disabled: boolean,
  handleChangeStart: (start: string) => void;
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

function TextfieldStartDate({
  selectedStartDate,
  handleChangeStart,
  disabled,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<moment.Moment>(
    selectedStartDate ? moment(selectedStartDate) : null,
  );
  const classes = useStyles();

  const handleChange = (date: moment.Moment) => {
    if (date !== null) {
      date = date.startOf('day');
      handleChangeStart(date.toISOString());
    } else {
      handleChangeStart('');
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
          label="Search start date"
          placeholder="Insert start date"
          format="DD/MM/yyyy"
          value={value}
          disabled={disabled}
          maxDate={moment(selectedEndDate)}
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

export default TextfieldStartDate;
