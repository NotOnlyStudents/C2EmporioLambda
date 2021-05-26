import {
  Box, CardMedia, Fab, IconButton,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
  image: string;
  handleRemoveImage: (image: string) => void;
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'block',
    margin: '2em',
  },
  removeIcon: {
    position: 'absolute',
    right: '-28px',
    top: '-28px',
  },
  image: {
    width: '10em',
    height: '10em',
  },
});

function ImageUploaded({ image, handleRemoveImage } : Props) : React.ReactElement {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Fab
        className={classes.removeIcon}
        component="span"
        color="secondary"
        onClick={() => { handleRemoveImage(image); }}
      >
        <HighlightOffIcon />
      </Fab>
      <CardMedia
        className={classes.image}
        image={image}
      />
    </Box>
  );
}

export default ImageUploaded;
