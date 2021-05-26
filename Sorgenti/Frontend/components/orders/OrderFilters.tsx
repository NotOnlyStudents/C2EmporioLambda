import React from 'react';
import {
  Box, Theme,
} from '@material-ui/core';
import { OrderFilter } from 'interfaces/orders/orders';
import TextFieldCustomerEmail from 'components/textfield/textfieldCustomerEmail';
import TextFieldOrderID from 'components/textfield/textfieldOrderID';
import CheckboxStatus from 'components/checkboxes/checkboxStatus';
import TextfieldStartDate from 'components/textfield/textfieldStartDate';
import TextfieldEndDate from 'components/textfield/textfieldEndDate';
import { makeStyles } from '@material-ui/styles';

interface Props {
  filter: OrderFilter;
  seller?: boolean;
  disabled?: boolean;
  handleChangeFilter: (filter: OrderFilter) => void;
  handleChangeFilterId: (filter: OrderFilter) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  dateContainer: {
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        marginBottom: '1em',
      },
    },
  },
}));

function OrderFilters({
  filter, seller, disabled, handleChangeFilter, handleChangeFilterId,
}: Props) {
  const classes = useStyles();

  const handleChangeStartDate = (start: string) => {
    const filterStartDate: OrderFilter = { ...filter };
    filterStartDate.start = start;
    handleChangeFilter(filterStartDate);
  };

  const handleChangeEndDate = (end: string) => {
    const filterEndDate: OrderFilter = { ...filter };
    filterEndDate.end = end;
    handleChangeFilter(filterEndDate);
  };

  const handleChangeCustomerEmail = (customerEmail: string) => {
    const filterCustomer: OrderFilter = { ...filter };
    filterCustomer.email = customerEmail;
    handleChangeFilter(filterCustomer);
  };

  const handleChangeOrderID = (id: string) => {
    const filterID: OrderFilter = { ...filter };
    filterID.id = id;
    handleChangeFilterId(filterID);
  };

  const handleChangeStatus = (notFulfilled: boolean) => {
    const filterStatus: OrderFilter = { ...filter };
    filterStatus.status = notFulfilled ? 'new' : '';
    handleChangeFilter(filterStatus);
  };

  const renderSearchIfSeller = (disabled: boolean) => (seller
    ? (
      <TextFieldCustomerEmail
        customer={filter.email}
        handleChangeCustomer={handleChangeCustomerEmail}
        disabled={disabled}
      />
    )
    : <></>);

  const renderCheckboxStatusIfSeller = (disabled: boolean) => (seller
    ? (
      <CheckboxStatus
        status={filter.status === 'new'}
        handleChangeStatus={handleChangeStatus}
        disabled={disabled}
      />
    )
    : <></>);

  return (
    <Box p={2}>
      <Box display="flex">
        { renderSearchIfSeller(disabled) }
      </Box>
      <Box display="flex">
        <TextFieldOrderID
          id={filter.id}
          handleChangeOrderId={handleChangeOrderID}
        />
        { renderCheckboxStatusIfSeller(disabled) }
      </Box>
      <Box
        display="flex"
        className={classes.dateContainer}
        marginTop="1em"
      >
        <TextfieldStartDate
          selectedStartDate={filter.start}
          selectedEndDate={filter.end}
          disabled={disabled}
          handleChangeStart={handleChangeStartDate}
        />
        <TextfieldEndDate
          selectedStartDate={filter.start}
          selectedEndDate={filter.end}
          disabled={disabled}
          handleChangeEnd={handleChangeEndDate}
        />
      </Box>
    </Box>
  );
}

export default OrderFilters;
