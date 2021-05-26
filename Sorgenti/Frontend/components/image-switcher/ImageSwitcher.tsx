import { Box, CardMedia, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
  images: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  sideImg: {
    width: '10em',
    height: '10em',
    backgroundSize: 'contain',
  },
  selectedImg: {
    width: '95%',
    height: '100%',
    backgroundSize: 'contain',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '95%',
    },
  },
  containerImages: {
    marginBottom: theme.spacing(4),
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  otherImages: {
    height: '35em',
    width: '10em',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      height: '10em',
      width: '100%',
    },
  },
}));

function ImageSwitcher({ images }: Props) {
  const classes = useStyles();

  const [actualImg, setActualImg] = React.useState(images[0]);

  const renderSideImages = () : React.ReactElement[] => images
    .filter((image: string) => image !== actualImg)
    .map((image: string) : React.ReactElement => (
      <CardMedia
        key={image}
        className={classes.sideImg}
        image={image}
        onClick={setActualImg.bind(this, image)}
      />
    ));

  const renderSideBox = () : React.ReactElement => {
    const otherImages = renderSideImages();

    return (
      otherImages.length !== 0
        ? (
          <Box
            display="flex"
            className={classes.otherImages}
          >
            {otherImages}
          </Box>
        )
        : <></>
    );
  };

  return (
    <Box className={classes.containerImages} display="flex" minHeight="35em">
      {renderSideBox()}
      <Box display="flex" width="100%" height="35em" justifyContent="center" alignItems="center">
        <CardMedia
          className={classes.selectedImg}
          image={actualImg}
        />
      </Box>
    </Box>
  );
}

export default ImageSwitcher;
