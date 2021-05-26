import React from 'react';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import NoResult from './NoResult';

function NoResultOrder() {
  return (
    <NoResult
      icon={NotInterestedIcon}
    >
      No order found
    </NoResult>
  );
}

export default NoResultOrder;
