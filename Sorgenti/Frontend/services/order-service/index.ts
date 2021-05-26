import OrderServiceFetch from './OrderServiceFetch';
import OrderServiceMock from './OrderServiceMock';

export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? OrderServiceMock : OrderServiceFetch;
