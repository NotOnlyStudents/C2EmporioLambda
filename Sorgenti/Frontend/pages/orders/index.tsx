import React from 'react';
import OrderService from 'services/order-service';
import {
  Order, OrderFilter, OrderPaginator,
} from 'interfaces/orders/orders';
import Head from 'next/head';
import { getSignedState } from 'lib/authContext';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getLoginLink, getOrderLink } from 'lib/links';
import { Typography } from '@material-ui/core';
import { withSSRContext } from 'aws-amplify';
import { SignedState } from 'interfaces/login';
import Orders from 'components/orders/Orders';

interface Props {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
}

function OrderCustomer({
  filters, orders, totalOrders,
}: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Orders' },
  ];

  return (
    <>
      <Head>
        <title>Orders | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Your orders
      </Typography>
      <Orders
        filters={filters}
        orders={orders}
        totalOrders={totalOrders}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  let token: string = '';
  const { query } = context;

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    token = signInUserSession.idToken.jwtToken;
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getOrderLink(true),
          permanent: false,
        },
      };
    }
  } catch (e) {
    // if (query.stripe) {
    //   return {
    //     redirect: {
    //       destination: getOrderLink(),
    //       permanent: false,
    //     },
    //   };
    // }

    // return {
    //   redirect: {
    //     destination: getLoginLink(),
    //     permanent: false,
    //   },
    // };
  }

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

export default OrderCustomer;
