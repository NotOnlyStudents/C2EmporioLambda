import { makeStyles, withStyles } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import React from 'react';
import {
  Box, Link, SvgIconTypeMap, Theme, Typography,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noResults: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: grey[500],
    color: 'white',
    borderRadius: '25%',
    width: '50em',
    height: '50em',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '40em',
      height: '40em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '35em',
      height: '35em',
    },
  },
  text: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: 'white',
  },
}));

export const noResultStyle = makeStyles({
  link: {
    color: 'white',
  },
});

interface Props {
  children: React.ReactNode,
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

function NoResult({ children, icon }: Props) {
  const classes = useStyles();
  const iconStyle = {
    root: {
      width: '10em',
      height: '10em',
    },
  };

  const renderIconIfPresent = () => {
    let Icon;

    if (icon) {
      Icon = withStyles(iconStyle)(icon);
    } else {
      Icon = () => (<></>);
    }

    return Icon;
  };

  const Icon = renderIconIfPresent();

  return (
    <Box
      className={classes.container}
    >
      <Box
        className={classes.noResults}
      >
        <Icon />
        <Typography className={classes.text}>
          { children }
        </Typography>
      </Box>
    </Box>
  );
}

NoResult.defaultProps = {
  icon: undefined,
};

export default NoResult;
