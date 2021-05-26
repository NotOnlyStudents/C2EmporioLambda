import CategoryServiceFetch from './CategoryServiceFetch';
import CategoryServiceMock from './CategoryServiceMock';

export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? CategoryServiceMock : CategoryServiceFetch;
