import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getCartLink, getLoginLink } from 'lib/links';
import { useRouter } from 'next/router';
import { Tooltip } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderNotAuthenticated(): React.ReactElement {
  const router = useRouter();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <Tooltip title="Your cart">
            <HeaderDesktopLink onClick={() => { router.push(getCartLink()); }}>
              <ShoppingCartIcon />
            </HeaderDesktopLink>
          </Tooltip>,
          <Tooltip title="Login">
            <HeaderDesktopLink onClick={() => { router.push(getLoginLink()); }}>
              <LoginIcon />
            </HeaderDesktopLink>
          </Tooltip>,
        ]}
        mobileMenu={[
          <HeaderMobileLink onClick={() => { router.push(getCartLink()); }}>
            <ShoppingCartIcon />
            Your cart
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getLoginLink()); }}>
            <LoginIcon />
            Login
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
