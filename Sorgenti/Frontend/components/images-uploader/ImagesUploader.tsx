import React from 'react';
import {
  Box, Fab, makeStyles, Typography,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ImageUploaded from './ImageUploaded';

interface Props {
  images: string[];
  disabled: boolean;
  error: boolean;
  handleRemoveImage: (image: string) => void;
  handleAddImage: (
    event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
  imagesContainer: {
    minHeight: '10em',
    backgroundColor: grey[100],
  },
});

function ImagesUploader({
  images, disabled, handleRemoveImage, error, handleAddImage,
} : Props): React.ReactElement {
  const classes = useStyles();

  const renderUploadedImages = (): React.ReactElement[] => images.map(
    (image: string): React.ReactElement => (
      <ImageUploaded
        key={image}
        image={image}
        handleRemoveImage={handleRemoveImage}
      />
    ),
  );

  const renderErrorMessage = () : React.ReactElement => (
    <Typography color="secondary">
      Must insert at least one pic
    </Typography>
  );

  return (
    <Box>
      <Box
        className={classes.imagesContainer}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        p={2}
      >
        {
          error
            ? renderErrorMessage()
            : renderUploadedImages()
        }
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <label htmlFor="images-picker">
          <Fab component="span" color="primary" disabled={disabled}>
            <AddPhotoAlternateIcon />
          </Fab>
          <input
            accept="image/*"
            id="images-picker"
            type="file"
            disabled={disabled}
            hidden
            onChange={handleAddImage}
          />
        </label>
      </Box>
    </Box>
  );
}

export default ImagesUploader;
