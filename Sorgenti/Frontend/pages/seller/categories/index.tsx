import { BreadcrumbPath } from 'interfaces/breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { getHomeLink, getLoginLink } from 'lib/links';
import CategoriesList from 'components/categories/CategoriesList';
import {
  Box, Dialog, IconButton, Typography,
} from '@material-ui/core';
import Head from 'next/head';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';
import { withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

interface Props {
  categories: Category[],
  searchName: string,
  error: boolean
}

function CategoriesPage({ categories, searchName, error }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Categories' },
  ];

  React.useEffect(() => {
    if (error) {
      openSnackbar(Snackbars.errorRetrievingDataId);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Categories | Seller | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Categories
      </Typography>
      <CategoriesList
        categories={categories}
        searchName={searchName}
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
  const error = false;

  let categories: Category[] = [];
  const searchName = query.text || '';

  try {
    categories = await (new CategoryService()).getCategories(searchName);
  } catch (error) {
    error = true;
  }

  return {
    props: {
      categories,
      searchName,
      error,
    },
  };
}

export default CategoriesPage;
