import React, { ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

interface Props {
  totalElements: number,
  limit: number,
  page: number,
  handleChangePagination: (value: number) => void
}

function EMLPagination({
  totalElements, limit, page, handleChangePagination,
} : Props) : React.ReactElement {
  const totalPage = (totalElements / limit | 0) + 1;

  const handleClickPagination = (event: ChangeEvent<unknown>, value: number): void => {
    handleChangePagination(value);
  };

  return (
    (totalElements > limit)
      ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleClickPagination}
          />
        </Box>
      )
      : <></>
  );
}

export default EMLPagination;
