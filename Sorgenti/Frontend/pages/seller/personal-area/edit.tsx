import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import {
  getEditPersonalAreaLink, getHomeLink, getLoginLink, getPersonalAreaLink,
} from 'lib/links';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import PersonalAreaEdit from 'components/users/PersonalAreaEdit';
import Head from 'next/head';
import { withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';

function EditPersonalAreaSeller(): React.ReactElement {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Personal area', href: getPersonalAreaLink(true) },
    { name: 'Edit' },
  ];

  return (
    <>
      <Head>
        <title>Editing seller personal informations | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaEdit />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Customer) {
      return {
        redirect: {
          destination: getEditPersonalAreaLink(),
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

  return { props: { } };
}

export default EditPersonalAreaSeller;
