import CartList from 'components/cart/cartList';
import CartService from 'services/cart-service';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import { Cart } from 'interfaces/cart/cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getHomeLink } from 'lib/links';
import { withSSRContext } from 'aws-amplify';
import { getSignedState, useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';

interface Props {
  cart: Cart;
}

function cartPage({ cart }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Cart' },
  ];

  const renderCartList = () => {
    const { signedState } = useAuthContext();
    if (cart.products.length === 0) {
      if (signedState === SignedState.Customer) {
        return (<NoProductInCart />);
      }

      return (<CartList items={cart.products} authenticated={false} />);
    }

    return (<CartList items={cart.products} authenticated />);
  };

  return (
    <>
      <Head>
        <title> Cart | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Your cart
      </Typography>
      { renderCartList() }
    </>
  );
}

export async function getServerSideProps(context) {
  let products = [];
  const { Auth } = withSSRContext(context);
  let token: string = '';
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);
    token = signInUserSession.idToken.jwtToken;

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getHomeLink(true),
          permanent: false,
        },
      };
    }
  } catch (error) { }

  try {
    products = await new CartService().getCartProducts(token);
  } catch (e) {
    products = [];
  }

  return {
    props: {
      cart: {
        products,
      },
    },
  };
}
export default cartPage;
