import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddProductIcon from 'components/icons/AddProductIcon';
import PLPIcon from 'components/icons/PLPIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {
  getCategoriesLink, getHomeLink, getNewProductLink, getPersonalAreaLink, getPLPLink,
} from 'lib/links';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { Tooltip } from '@material-ui/core';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderSeller() : React.ReactElement {
  const router = useRouter();
  const { setSignedState } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push(getHomeLink());

      setSignedState(SignedState.NotAuthenticated);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <Tooltip title="Add product">
            <HeaderDesktopLink onClick={() => { router.push(getNewProductLink()); }}>
              <AddProductIcon aria-label="Add product" />
            </HeaderDesktopLink>
          </Tooltip>,
          <Tooltip title="Product List Page">
            <HeaderDesktopLink onClick={() => { router.push(getPLPLink(true)); }}>
              <PLPIcon aria-label="Product list page" />
            </HeaderDesktopLink>
          </Tooltip>,
          <Tooltip title="All categories">
            <HeaderDesktopLink onClick={() => { router.push(getCategoriesLink()); }}>
              <ListAltIcon aria-label="Categories" />
            </HeaderDesktopLink>
          </Tooltip>,
          <Tooltip title="Your personal area">
            <HeaderDesktopLink
              onClick={() => { router.push(getPersonalAreaLink(true)); }}
            >
              <AccountCircleIcon aria-label="Your personal area" />
            </HeaderDesktopLink>
          </Tooltip>,
          <Tooltip title="Logout">
            <HeaderDesktopLink onClick={handleSignOut}>
              <ExitToAppIcon aria-label="Logout" />
            </HeaderDesktopLink>
          </Tooltip>,
        ]}
        mobileMenu={[
          <HeaderMobileLink onClick={() => { router.push(getNewProductLink()); }}>
            <AddProductIcon />
            Add product
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getPLPLink(true)); }}>
            <PLPIcon />
            Product List Page
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getCategoriesLink()); }}>
            <ListAltIcon />
            All categories
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getPersonalAreaLink(true)); }}>
            <AccountCircleIcon aria-label="Your personal area" />
            Your personal area
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={handleSignOut}>
            <ExitToAppIcon aria-label="Logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
