import PDPEdit from 'components/pdp/PDPEdit';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { Product } from 'interfaces/products/product';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import {
  getHomeLink, getLoginLink, getPLPLink, getViewProductLink,
} from 'lib/links';
import { withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { redirect } from 'next/dist/next-server/server/api-utils';
import { GetServerSideProps } from 'next';

interface Props {
  product: Product
}

function PDPEditPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink(true) },
    { name: product.name, href: getViewProductLink(product.id, true) },
    { name: 'Edit' },
  ];

  const title = `Editing ${product.name}`;

  const p: Product = {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    quantity: product.quantity,
    price: product.price,
    evidence: product.evidence || false,
    categories: product.categories,
    discount: product.discount !== null ? product.discount : 0,
  };

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPEdit
        title={title}
        product={p}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    if (await getSignedState(signInUserSession) === SignedState.Customer) {
      return {
        redirect: {
          destination: getHomeLink(),
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

  const { query } = context;
  let product;

  try {
    product = await (new ProductService()).getProductById(query.id);
  } catch (error) {
    return {
      redirect: {
        destination: getHomeLink(true),
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

export default PDPEditPage;
