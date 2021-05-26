import {
  Box, Breadcrumbs, Link, Theme, Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { useRouter } from 'next/router';
import React from 'react';
import theme from 'styles/theme';

interface Props {
  paths: BreadcrumbPath[]
}

const useStyles = makeStyles({
  link: {
    display: 'flex',
    color: 'inherit',
    cursor: 'pointer',
  },
});

function EMLBreadcrumb({ paths } : Props) {
  const classes = useStyles();
  const router = useRouter();

  const iconTheme = {
    root: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  };

  const renderIconIfPresent = (icon) => {
    let Icon;

    if (icon) {
      Icon = withStyles(iconTheme)(icon);
    } else {
      Icon = () => <></>;
    }

    return Icon;
  };

  const renderOthersPaths = () => paths
    .slice(0, paths.length - 1)
    .map((path: BreadcrumbPath) => {
      const Icon = renderIconIfPresent(path.icon);

      return (
        <Link
          key={path.href}
          className={classes.link}
          onClick={() => { router.push(path.href); }}
        >
          <Icon />
          { path.name }
        </Link>
      );
    });

  const renderLastPath = (path: BreadcrumbPath) => {
    const Icon = renderIconIfPresent(path.icon);

    return (
      <Box display="flex">
        <Icon />
        <Typography color="textPrimary">{ path.name }</Typography>
      </Box>
    );
  };

  return (
    <Box m={2}>
      <Breadcrumbs aria-label="breadcrumb">
        { renderOthersPaths() }
        { renderLastPath(paths[paths.length - 1]) }
      </Breadcrumbs>
    </Box>
  );
}

export default EMLBreadcrumb;
