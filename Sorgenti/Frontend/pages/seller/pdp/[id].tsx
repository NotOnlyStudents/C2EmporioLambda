import PDPView from 'components/pdp/PDPView';
import { Product } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import {
  getHomeLink, getLoginLink, getPLPLink, getViewProductLink,
} from 'lib/links';
import { withSSRContext } from 'aws-amplify';
import { getSignedState, useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { useRouter } from 'next/router';

interface Props {
  product: Product,
}

function PDPPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink(true) },
    { name: product.name },
  ];

  return (
    <>
      <Head>
        <title>
          { `${product.name} | Seller | EmporioLambda` }
        </title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPView product={product} edit />
    </>
  );
}

export async function getServerSideProps(context) {
  let product: Product;
  const { query } = context;
  const { Auth } = withSSRContext(context);
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    if (await getSignedState(signInUserSession) === SignedState.Customer) {
      return {
        redirect: {
          destination: getViewProductLink(query.id),
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: getLoginLink(),
        permanent: false,
      },
    };
  }

  try {
    product = await (new ProductService()).getProductById(query.id);
  } catch (error) {
    return {
      redirect: {
        destination: getPLPLink(true),
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default PDPPage;
