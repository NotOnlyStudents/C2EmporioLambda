import React from 'react';
// import EMLPagination from 'components/pagination/EMLPagination';
import { NextRouter, withRouter } from 'next/router';
import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';
import OrderService from 'services/order-service';
import NoResultOrder from 'components/noresult/NoResultOrder';
import { getAuthToken } from 'lib/authContext';
import OrdersList from './OrdersList';
import OrderFilters from './OrderFilters';

interface Props {
  router: NextRouter,
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
  seller?: boolean,
}

interface State {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
}

class Orders extends React.Component<Props, State> {
  public static readonly limit = 4;

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: {
        // offset: 0,
        // sort?: SortOrderType,
        id: '',
        start: '',
        end: '',
        email: '',
        ...props.filters,
      },
      orders: props.orders,
      totalOrders: props.totalOrders,
    };
  }

  componentDidMount() {
    const { filters } = this.state;

    if (filters.id) {
      this.handleChangeFilterId(filters);
    } else {
      this.handleChangeFilters(filters);
    }
  }

  handleChangeFilters = async (filters: OrderFilter) => {
    const { router } = this.props;
    const query = {
      ...router.query,
    };

    delete query.id;

    if (filters.email) {
      query.email = filters.email;
    } else {
      delete query.email;
    }

    if (filters.start) {
      query.start = filters.start;
    } else {
      delete query.start;
    }

    if (filters.end) {
      query.end = filters.end;
    } else {
      delete query.end;
    }

    if (filters.status) {
      query.status = filters.status;
    } else {
      delete query.status;
    }

    // filters.offset = 0;
    // query.offset = filters.offset.toString();

    router.push({
      pathname: '',
      query,
    }, null, {
      scroll: false,
    });

    this.setState({ filters });
    this.fetchAllOrder(query);
  };

  handleChangeFilterId = async (filters: OrderFilter) => {
    const { router } = this.props;

    const query = {
      ...router.query,
    };

    if (filters.id) {
      delete query.email;
      delete query.start;
      delete query.end;
      delete query.status;

      query.id = filters.id;

      router.push({
        pathname: '',
        query,
      }, null, {
        scroll: false,
      });

      this.setState({ filters });
      this.fetchOrderById(filters.id);
    } else {
      this.handleChangeFilters(filters);
    }
  };

  handleChangedStatus = () => {
    this.handleChangeFilters(this.state.filters);
  };

  fetchAllOrder = async (query) => {
    let paginator: OrderPaginator;

    try {
      const token = await getAuthToken();
      paginator = await (new OrderService()).getAllOrder(token, query);
    } catch (error) {
      paginator = {
        orders: [],
        total: 0,
      };
    }

    this.setState({
      orders: paginator.orders,
      totalOrders: paginator.total,
    });
  };

  fetchOrderById = async (query) => {
    let order: Order;
    const ordersId: Order[] = [];
    try {
      const token = await getAuthToken();
      order = await (new OrderService()).getOrderById(token, query);
      ordersId.push(order);
    } catch (error) {
      console.log(error);
    }

    this.setState({
      orders: ordersId,
    });
  };

  renderOrderIfThereAre = () => {
    const { seller } = this.props;
    const { orders } = this.state;

    return (
      orders.length !== 0
        ? (
          <OrdersList
            orders={orders}
            seller={seller}
            onChangeStatus={this.handleChangedStatus}
          />
        )
        : <NoResultOrder />
    );
  };

  render(): React.ReactElement {
    const {
      seller,
    } = this.props;
    const {
      filters,
    } = this.state;
    return (
      <>
        <OrderFilters
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
          handleChangeFilterId={this.handleChangeFilterId}
          disabled={filters.id !== ''}
          seller={seller}
        />
        {this.renderOrderIfThereAre()}
      </>
    );
  }
}

export default withRouter(Orders);
