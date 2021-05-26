import React from 'react';
import { Link } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useRouter } from 'next/router';
import { getHomeLink } from 'lib/links';
import NoResult, { noResultStyle } from './NoResult';

function NoProductInCart() {
  const classes = noResultStyle();

  const router = useRouter();

  return (
    <NoResult
      icon={RemoveShoppingCartIcon}
    >
      Any product into the cart
      <br />
      return to
      {' '}
      <Link
        onClick={() => { router.push(getHomeLink()); }}
        className={classes.link}
        underline="always"
      >
        home
      </Link>
      {' '}
      and start shopping!
    </NoResult>
  );
}

export default NoProductInCart;
