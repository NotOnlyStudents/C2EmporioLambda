import React from 'react';

import Header from 'components/header/Header';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

interface Props {
  children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: '0 2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0.2em',
    },
  },
}));

function Layout({ children }: Props) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={classes.main}>
        { children }
      </main>
    </>
  );
}

export default Layout;
