import React from 'react';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';

interface Props {
  status: boolean,
  disabled: boolean,
  handleChangeStatus: (status: boolean) => void;
}

const useStyles = makeStyles(() => ({
  label: {
    textAlign: 'center',
  },
}));

function CheckboxStatus({
  status,
  disabled,
  handleChangeStatus,
}: Props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeStatus(event.target.checked);
  };

  React.useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <FormControlLabel
      classes={{
        label: classes.label,
      }}
      control={(
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="Not fulfilled"
          inputProps={{ 'aria-label': 'Checbox for status' }}
        />
      )}
      label="Not fulfilled"
      labelPlacement="bottom"
      disabled={disabled}
    />
  );
}

export default CheckboxStatus;
