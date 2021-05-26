import React from 'react';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import NoResult from './NoResult';

function NoResultCategory() {
  return (
    <NoResult
      icon={NotInterestedIcon}
    >
      No categories found
    </NoResult>
  );
}

export default NoResultCategory;
