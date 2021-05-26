import React from 'react';
import OrderService from 'services/order-service';
import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';
import Head from 'next/head';
import { getSignedState } from 'lib/authContext';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getLoginLink, getOrderLink } from 'lib/links';
import { Box, Typography } from '@material-ui/core';
import { withSSRContext } from 'aws-amplify';
import { SignedState } from 'interfaces/login';
import Orders from 'components/orders/Orders';

interface Props {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
}

function HomeSeller({
  filters, orders, totalOrders,
}: Props) {
  return (
    <>
      <Head>
        <title>Home | Seller | EmporioLambda</title>
      </Head>
      <Box paddingTop="1em">
        <Typography variant="h4" component="h2">
          All orders
        </Typography>
        <Orders
          filters={filters}
          orders={orders}
          totalOrders={totalOrders}
          seller
        />
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  let token: string = '';
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    token = signInUserSession.idToken.jwtToken;
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Customer) {
      return {
        redirect: {
          destination: getHomeLink(),
          permanent: false,
        },
      };
    }
  } catch (e) {
    return {
      redirect: {
        destination: getLoginLink(),
        permanent: false,
      },
    };
  }

  const { query } = context;
  const filters: OrderFilter = query;

  if (query.email) {
    filters.email = query.email;
  }

  if (query.start) {
    filters.start = query.start;
  }

  if (query.end) {
    filters.end = query.end;
  }

  // filters.offset = parseInt(query.offset) || 0;

  let paginator: OrderPaginator;

  try {
    if (query.id) {
      paginator = {
        orders: [await (new OrderService()).getOrderById(token, filters.id)],
        total: 0,
      };
    } else {
      paginator = await (new OrderService()).getAllOrder(token, filters);
    }
  } catch (e) {
    paginator = {
      orders: [],
      total: 0,
    };
  }

  return {
    props: {
      filters,
      orders: paginator.orders,
      totalOrders: paginator.total,
    },
  };
}

export default HomeSeller;
