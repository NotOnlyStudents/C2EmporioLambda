import ProductServiceFetch from './ProductServiceFetch';
import ProductServiceMock from './ProductServiceMock';

export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? ProductServiceMock : ProductServiceFetch;
