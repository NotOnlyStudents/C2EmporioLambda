import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import CartService from 'services/cart-service';
import CartServiceType from 'services/cart-service/CartService';
import { CartToken } from 'interfaces/cart/cart-request';
import PaymentIcon from '@material-ui/icons/Payment';
import { Address } from 'interfaces/address/address';
import { getAuthToken } from 'lib/authContext';

interface Props {
  address: Address,
  additionalInfo: string
  disable?: boolean
}

function CheckoutButton({ address, additionalInfo, disable }: Props) {
  const handleClick = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE);

    const token: string = await getAuthToken();

    const cartToken: CartToken = await (new CartService()).getCartToken(token);

    const obj = {
      address,
      'cart-token': {
        ...cartToken,
      },
      additionalInfo,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    // const cartService: CartServiceType = new CartService();

    // cartToken.token.data.products.map(async (product) => {
    //   await cartService.deleteCartProducts(token, product.id);
    // });

    const res = await response.json();

    await stripe.redirectToCheckout({
      sessionId: res.data.sessionId,
    });
  };

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleClick}
      disabled={disable}
      startIcon={<PaymentIcon />}
    >
      Checkout
    </Button>
  );
}

CheckoutButton.defaultProps = {
  disable: false,
};

export default CheckoutButton;
