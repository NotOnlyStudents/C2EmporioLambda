import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  selectedEvidence: boolean
  handleChangeEvidence: (evidence: boolean) => void;
}

function CheckboxEvidence({
  selectedEvidence, handleChangeEvidence,
}: Props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeEvidence(event.target.checked);
  };

  React.useEffect(() => {
    setChecked(selectedEvidence);
  }, [selectedEvidence]);

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={handleChange} name="Evidence" inputProps={{ 'aria-label': 'Checbox for evidence' }} />
      }
      label="Evidence"
      labelPlacement="bottom"
    />
  );
}

export default CheckboxEvidence;
