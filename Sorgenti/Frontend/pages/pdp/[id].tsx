import PDPView from 'components/pdp/PDPView';
import {
  PLPProductItem, Product, ProductPaginator,
} from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getPLPLink, getViewProductLink } from 'lib/links';
import { Auth, withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import { useRouter } from 'next/router';

interface Props {
  product: Product
}

function PDPPage({ product }: Props) {
  const router = useRouter();
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink() },
    { name: product.name },
  ];

  const checkAuth = async () => {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    switch (signedState) {
      case SignedState.Seller: {
        router.push(getViewProductLink(product.id, true));
        break;
      }
      default:
        break;
    }
  };

  React.useEffect(() => { checkAuth(); }, []);

  return (
    <>
      <Head>
        <title>
          { `${product.name} | EmporioLambda` }
        </title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPView product={product} />
    </>
  );
}

export async function getStaticPaths() {
  let paginator: ProductPaginator;
  try {
    paginator = await (new ProductService()).getAllProduct();
  } catch (error) {
    console.error(error);
    paginator = {
      products: [],
      total: 0,
    };
  }
  const productsWithoutTotal: PLPProductItem[] = paginator.products;

  const paths = productsWithoutTotal.map((singleProduct) => ({
    params: { id: singleProduct.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
  let product: Product;
  const { params } = context;

  try {
    product = await (new ProductService()).getProductById(params.id);
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
}

export default PDPPage;
