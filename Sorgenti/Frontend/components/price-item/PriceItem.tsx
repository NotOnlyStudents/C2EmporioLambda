import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import React from 'react';

interface Props {
  price: number,
  discountedPrice: number,
  discount: number,
  quantity?: number
}

const useStyles = makeStyles({
  root: {
    '& > *': {
      marginRight: '1em',
    },
  },
  price: {
    textDecoration: 'line-through',
  },
  discount: {
    color: green[500],
  },
});

function PriceItem({
  price, quantity, discountedPrice, discount,
} : Props) {
  const classes = useStyles();

  const renderDiscountIfPresent = () => (
    discount
      ? (
        <>
          <Typography className={classes.discount}>
            { discountedPrice }
            €
          </Typography>
          <Typography className={classes.discount}>
            {discount}
            %
          </Typography>
        </>
      ) : <></>
  );

  return (
    <Box display="flex" className={classes.root}>
      <Typography className={discount ? classes.price : ''}>
        {price * quantity}
        €
      </Typography>
      { renderDiscountIfPresent() }
    </Box>
  );
}

PriceItem.defaultProps = {
  quantity: 1,
};

export default PriceItem;
