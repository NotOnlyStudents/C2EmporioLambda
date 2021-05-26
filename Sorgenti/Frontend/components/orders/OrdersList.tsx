import React from 'react';
import { Order } from 'interfaces/orders/orders';
import OrderProduct from 'components/orders/OrderProduct';
import { Box } from '@material-ui/core';

interface Props {
  orders: Order[],
  seller?: boolean,
  onChangeStatus: () => void
}

function OrdersList({
  orders,
  seller,
  onChangeStatus,
}: Props) : React.ReactElement {
  const renderAllOrders = (): React.ReactElement[] => orders.map(
    (item: Order): React.ReactElement => (
      <Box key={item.id} marginBottom="4em">
        <OrderProduct
          order={item}
          seller={seller}
          onChangeStatus={onChangeStatus}
        />
      </Box>
    ),
  );

  return (
    <Box>
      { renderAllOrders() }
    </Box>
  );
}

export default OrdersList;
