import { Box, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';

interface Props {
  evidence: boolean;
  handleChangeEvidence: (evidence: boolean) => Promise<void>;
}

function PDPEvidence({ evidence, handleChangeEvidence }: Props): React.ReactElement {
  const handleAddEvidence = async () => {
    handleChangeEvidence(true);
  };

  const handleRemoveEvidence = async () => {
    handleChangeEvidence(false);
  };

  return (
    <Box>
      { evidence
        ? (
          <IconButton
            onClick={handleRemoveEvidence}
          >
            <StarIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleAddEvidence}
          >
            <StarBorderIcon color="primary" />
          </IconButton>
        ) }
    </Box>
  );
}

export default PDPEvidence;
