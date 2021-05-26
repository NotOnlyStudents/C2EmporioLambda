import React, { useEffect } from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifyForgotPassword,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import { CognitoCustomAttributes, getSignedState, useAuthContext } from 'lib/authContext';
import { useRouter } from 'next/router';
import { getHomeLink } from 'lib/links';
import Head from 'next/head';
import { SignedState } from 'interfaces/login';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { Auth, withSSRContext } from 'aws-amplify';
import CartService from 'services/cart-service/CartServiceFetch';

const handleLogin = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const storage = localStorage.getItem('item');
    if (storage != null) {
      const products = JSON.parse(storage);

      for (let i = 0; i < products.length; i++) {
        await new CartService().postCartProducts(token, products[i]);
      }
      localStorage.removeItem('item');
    }
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  const { setAuthState, setUserInfo, setSignedState } = useAuthContext();
  const router = useRouter();

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Authentication' },
  ];

  useEffect(() => onAuthUIStateChange(async (nextAuthState: AuthState, authData: any) => {
    if (nextAuthState === AuthState.SignedIn) {
      const { attributes, signInUserSession } = authData;

      setAuthState(nextAuthState);
      setUserInfo({
        name: attributes[CognitoCustomAttributes.name],
        surname: attributes[CognitoCustomAttributes.surname],
        email: attributes.email,
      });

      const signedState: SignedState = await getSignedState(signInUserSession);

      setSignedState(signedState);

      router.push(getHomeLink(signedState === SignedState.Seller));
    }
  }), []);

  return (
    <>
      <Head>
        <title>Authentication | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            { type: 'custom:firstName', placeholder: 'Enter your first name', label: 'First Name *' },
            { type: 'custom:lastName', placeholder: 'Enter your last name', label: 'Last Name *' },
            { type: 'email' },
            { type: 'password' },
          ]}
        />
        <AmplifySignIn slot="sign-in" handleAuthStateChange={handleLogin} usernameAlias="email" />
        <AmplifyForgotPassword slot="forgot-password" />
      </AmplifyAuthenticator>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    const isSeller = await getSignedState(signInUserSession) === SignedState.Seller;

    return {
      redirect: {
        destination: getHomeLink(isSeller),
        permanent: false,
      },
    };
  } catch (error) { }

  return { props: { } };
}

export default Login;
