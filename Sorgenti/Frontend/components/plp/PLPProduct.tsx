import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CartService from 'services/cart-service/CartServiceFetch';
import { CartProduct, PLPProductItem, Product } from 'interfaces/products/product';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link,
} from '@material-ui/core';
import QuantityManager from 'components/quantity/QuantityManager';
import ProductService from 'services/product-service/ProductServiceFetch';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PriceItem from 'components/price-item/PriceItem';
import { getViewProductLink } from 'lib/links';
import { Auth } from 'aws-amplify';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import { useRouter } from 'next/router';

interface Props {
  product: PLPProductItem
  seller?: boolean
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  image: {
    height: 300,
    backgroundSize: 'contain',
  },
  notAvailableText: {
    width: '100%',
    textAlign: 'right',
    backgroundColor: 'white',
  },
});

function PLPProduct({ product, seller }: Props) {
  const { openSnackbar } = useSnackbarContext();

  const [quantity, setQuantity] = React.useState(1);

  const classes = useStyles();
  const router = useRouter();

  const checkQuantityProductInCart = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const products: CartProduct[] = await new CartService().getCartProducts(token);

      const addedQuantity = products
        .filter((p: CartProduct) => p.id === product.id)
        .map((p: CartProduct) => (p.quantity));

      if (addedQuantity.length) {
        setQuantity(addedQuantity[0]);
      }
    } catch (error) {
      const storage = localStorage.getItem('item');
      if (storage !== null) {
        const products = JSON.parse(storage);
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === product.id) {
            setQuantity(products[i].quantity);
          }
        }
      }
    }
  };

  React.useEffect(() => {
    checkQuantityProductInCart();
  }, []);

  const handleAddToCart = async () => {
    const productToCart: Product = await (new ProductService()).getProductById(product.id);
    let token = '';
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
      // openSnackbar(Snackbars.addToCartSuccessId);
    } catch (error) {
      // openAlert(addToCartErrorId);
    } finally {
      try {
        await new CartService().postCartProducts(token, { ...productToCart, quantity });
        openSnackbar(Snackbars.addToCartSuccessId);
      } catch (e) {
        openSnackbar(Snackbars.addToCartErrorId);
      }
    }
  };

  const showNotAvailableBanner = () : React.ReactElement => {
    if (product.quantity <= 0) {
      return (
        <Typography className={classes.notAvailableText} color="error">
          Not available
        </Typography>
      );
    }

    return <></>;
  };

  const showInEvidenceBanner = () : React.ReactElement => (product.evidence ? <StarIcon style={{ color: '#FFEB3B' }} fontSize="large" /> : <></>);

  const renderAddToCartIfCustomer = () => (!seller
    ? (
      <IconButton color="primary" onClick={handleAddToCart}>
        <AddShoppingCartIcon />
      </IconButton>
    )
    : <></>);

  const renderQuantityManagerIfCustomer = () => (!seller
    ? <QuantityManager counter={quantity} handleCounterChange={setQuantity} />
    : <></>
  );

  return (
    <>
      <Card className={classes.root}>
        <Box position="relative" display="block">
          <CardMedia
            className={classes.image}
            image={product.image}
          />
          <Box position="absolute" display="flex" flexDirection="column" alignItems="flex-end" width="100%" top={0}>
            { showNotAvailableBanner() }
            { showInEvidenceBanner() }
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            { product.name }
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            { renderQuantityManagerIfCustomer() }
            <PriceItem
              price={product.price}
              discount={product.discount}
              discountedPrice={product.discountedPrice}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button
              component={Link}
              size="small"
              color="primary"
              onClick={() => { router.push(getViewProductLink(product.id, seller)); }}
            >
              See more details
            </Button>
            { renderAddToCartIfCustomer() }
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default PLPProduct;
