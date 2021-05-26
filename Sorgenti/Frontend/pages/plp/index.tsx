import React from 'react';

import { PLPProductItem, ProductFilter, ProductPaginator } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import Head from 'next/head';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import PLP from 'components/plp/PLP';
import { getHomeLink, getPLPLink } from 'lib/links';
import { getSignedState } from 'lib/authContext';
import { withSSRContext } from 'aws-amplify';
import { SignedState } from 'interfaces/login';

interface Props {
  filters: ProductFilter,
  products: PLPProductItem[],
  total: number,
  error: boolean
}

function PLPCustomerPage({
  filters, products, total, error,
}: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Product List Page' },
  ];

  return (
    <>
      <Head>
        <title>Products List Page | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PLP
        filters={filters}
        products={products}
        total={total}
        error={error}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getPLPLink(true),
          permanent: false,
        },
      };
    }
  } catch (e) { }

  const { query } = context;
  let filters: ProductFilter = query;
  if (filters) {
    if (query.categories) {
      if (!Array.isArray(query.categories)) {
        filters.categories = [query.categories];
      }
    }

    if (query.available) {
      filters.available = query.available === 'true';
    }

    if (query.evidence) {
      filters.evidence = query.evidence === 'true';
    }

    if (query.priceMin) {
      filters.priceMin = query.priceMin;
    }

    if (query.priceMax) {
      filters.priceMax = query.priceMax;
    }

    filters.offset = parseInt(query.offset) || 0;

    filters.limit = 24;
  } else {
    filters = {
      offset: 0,
      limit: 24,
    };
  }

  let paginator: ProductPaginator;
  let error = false;

  try {
    paginator = await (new ProductService()).getAllProduct(filters);
  } catch (e) {
    paginator = {
      products: [],
      total: 0,
    };
    error = true;
  }
  return {
    props: {
      filters,
      products: paginator.products,
      total: paginator.total,
      error,
    },
  };
}

export default PLPCustomerPage;
