import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CartProduct } from 'interfaces/products/product';
import {
  Button, Grid, Link, makeStyles,
} from '@material-ui/core';
import QuantityManager from 'components/quantity/QuantityManager';
import PriceItem from 'components/price-item/PriceItem';
import { getViewProductLink } from 'lib/links';
import { useRouter } from 'next/router';

interface Props {
  item: CartProduct
  index: number
  payments?: boolean;
  handleChangeQuantity: (quantity: number, index: number) => void
  handleRemoveProduct: (index: number) => void
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: '2em',
  },
  image: {
    width: 128,
    height: '14em',
    margin: 'auto',
    display: 'block',
    backgroundSize: 'contain',
  },
  price: {
    alignSelf: 'center',
    paddingLeft: 10,
  },
  description: {
    paddingLeft: 7,
    flexDirection: 'column',
  },
  text: {
    fontWeight: 500,
  },
  buttonLikeLink: {
    textAlign: 'left',
  },
});

function CartItem({
  item, index, payments, handleChangeQuantity, handleRemoveProduct,
}: Props) {
  const classes = useStyles();
  const router = useRouter();

  const handleCounterChange = (quantity: number) => {
    handleChangeQuantity(quantity, index);
  };

  const handleClickRemove = async () => {
    handleRemoveProduct(index);
  };

  const renderPrice = () => (item.discountedPrice * item.quantity).toFixed(2);

  const renderRemoveProductIfInCart = () => (
    (!payments)
      ? (
        <Typography>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleClickRemove}
          >
            Remove product
          </Button>
        </Typography>
      )
      : <></>
  );

  const renderEditQuantityIfInCart = () => (
    (!payments)
      ? (
        <QuantityManager
          counter={item.quantity}
          handleCounterChange={handleCounterChange}
        />
      )
      : (
        <Typography>
          Quantity:
          {' '}
          {item.quantity}
        </Typography>
      )
  );

  return (
    <Grid container className={classes.root}>
      <Grid item container>
        <CardMedia
          className={classes.image}
          image={item.image}
        />
        <Grid item xs={12} sm container>
          <Grid item xs container className={classes.description}>
            <Grid item container>
              <Grid item>
                <Typography variant="subtitle1" className={classes.text}>
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  <Button
                    onClick={() => { router.push(getViewProductLink(item.id)); }}
                    component={Link}
                    size="small"
                    color="primary"
                  >
                    See more details
                  </Button>
                </Typography>
                { renderRemoveProductIfInCart() }
                { renderEditQuantityIfInCart() }
                <Typography variant="body2" color="textSecondary">
                  Unit price:
                </Typography>
                <PriceItem
                  price={item.price}
                  discount={item.discount}
                  discountedPrice={item.discountedPrice}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.price}>
            <Typography variant="subtitle1">
              Price:
              {' '}
              { `${renderPrice()}€` }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CartItem;
