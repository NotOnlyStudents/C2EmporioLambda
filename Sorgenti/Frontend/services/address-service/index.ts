import AddressServiceFetch from './AddressServiceFetch';
import AddressServiceMock from './AddressServiceMock';

// export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? AddressServiceMock : AddressServiceFetch;
export default AddressServiceFetch;
