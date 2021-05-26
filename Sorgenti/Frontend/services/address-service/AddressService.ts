import { Address } from 'interfaces/address/address';

interface AddressService {
  getAllAddress(token): Promise<Address[]>;
  getAddressById(token, id: string): Promise<Address>;
  createAddress(token, address: Address): Promise<Address>;
  editAddress(token, id: string, address: Address): Promise<Address>;
  deleteAddress(token, id: string): Promise<void>;
}

export default AddressService;
