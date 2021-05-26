import React from 'react';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import { AuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { getLoginLink, getPaymentLink } from 'lib/links';
import CartService from 'services/cart-service';
import { Auth } from 'aws-amplify';
import { productToCartProduct } from 'interfaces/products/product-converter';
import { SnackbarContext, Snackbars } from 'lib/SnackbarContext';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import CartItem from './cartItem';

interface Props {
  items: CartProduct[];
  payment?: boolean;
  authenticated?: boolean;
}

interface State{
  items: CartProduct[];
}
class CartList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { items: props.items };
  }
  /*      {
        id:products.id,
        name:products.name,
        description:products.description.name,
        price:products.price,
        quantity:products.quantity,
        available:products.available,
        evidence:products.evidence,
        categories: products.categories,
        images: products.images
      } */

  componentDidMount() {
    // Allow a not authenticated user to access his local cart
    if (!this.props.authenticated) {
      if (localStorage.getItem('item') != null) {
        const storage = localStorage.getItem('item');

        const products = JSON.parse(storage);

        this.setState({ items: products.map(productToCartProduct) });
      }
    }
  }

  handleChangeQuantity = async (quantity: number, index: number): Promise<void> => {
    const { openSnackbar } = this.context;
    let token: string = '';
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) { } finally {
      await (new CartService()).patchCartProducts(token, this.state.items[index].id, quantity);
      this.setState((state: State) => {
        const newState: State = state;
        newState.items[index].quantity = quantity;
        return newState;
      });
      openSnackbar(Snackbars.changeQuantitySuccessId);
    }
  };

  handleRemoveProduct = async (index: number): Promise<void> => {
    const { openSnackbar } = this.context;
    let token = '';
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) { } finally {
      await new CartService().deleteCartProducts(token, this.state.items[index].id);
      this.setState((state: State) => {
        const newState: State = state;

        newState.items.splice(index, 1);

        return newState;
      });
      openSnackbar(Snackbars.removedFromCartSuccessId);
    }
  };

  calculateTotalPrice = (): string => (
    this.state.items
      .map((item: CartProduct) => (item.quantity * item.discountedPrice))
      .reduce(
        (totalPrice, price): number => (
          totalPrice + price
        ),
        0,
      ).toFixed(2)
  );

  renderPaymentButtonIfLogged = () => {
    const { payment, authenticated } = this.props;

    const button = authenticated
      ? (
        <Button
          variant="contained"
          color="primary"
          href={getPaymentLink()}
          startIcon={<ShopIcon />}
        >
          Buy
        </Button>
      )
      : (
        <Button
          variant="contained"
          color="primary"
          href={getLoginLink()}
          startIcon={<ShopIcon />}
        >
          Login to buy it
        </Button>
      );

    return !payment ? button : <></>;
  };

  renderAllItems = (): React.ReactElement[] => (this.state.items.map(
    (item: CartProduct, index: number): React.ReactElement => (
      <Box key={item.id} marginBottom="4em">
        <CartItem
          item={item}
          index={index}
          handleChangeQuantity={this.handleChangeQuantity}
          handleRemoveProduct={this.handleRemoveProduct}
          payments={this.props.payment}
        />
      </Box>
    ),
  ))
  ;

  render() {
    return (
      this.state.items.length !== 0
        ? (
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box
                display="flex"
                marginRight={2}
              >
                <Typography>
                  Total price:
                  {' '}
                  {`${this.calculateTotalPrice()}€`}
                </Typography>
              </Box>
              { this.renderPaymentButtonIfLogged() }
            </Box>
            {this.renderAllItems()}
          </Box>
        )
        : <NoProductInCart />
    );
  }
}

CartList.contextType = SnackbarContext;

export default CartList;
