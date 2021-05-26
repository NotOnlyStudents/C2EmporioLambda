import React from 'react';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import NoResult from './NoResult';

function NoResultProduct() {
  return (
    <NoResult
      icon={NotInterestedIcon}
    >
      No products found
    </NoResult>
  );
}

export default NoResultProduct;
