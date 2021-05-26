import HTTPRequest from 'lib/HTTPRequest';
import {
  Address,
} from 'interfaces/address/address';
import {
  AddressesDELETERequest,
  AddressesGETRequest,
  AddressesPATCHRequest, AddressesPOSTRequest, AddressGETRequest,
} from 'interfaces/address/address-request';
import AddressService from './AddressService';

class AddressServiceFetch implements AddressService {
  getAllAddress = async (token): Promise<Address[]> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ADDRESSES_SERVICE_URL, 'addresses');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: AddressesGETRequest = await req.get<AddressesGETRequest>('', headers);
    return res.data;
  };

  getAddressById = async (token, id: string): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ADDRESSES_SERVICE_URL, `addresses/${id}`);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: AddressGETRequest = await req.get<AddressGETRequest>('', headers);

    return res.data;
  };

  createAddress = async (token, address: Address): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ADDRESSES_SERVICE_URL, 'addresses');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };

    const body: string = JSON.stringify(address);

    const res: AddressesPOSTRequest = await req.post<AddressesPOSTRequest>(body, headers);

    return res.data;
  };

  editAddress = async (token, id: string, address: Address): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ADDRESSES_SERVICE_URL, `addresses/${id}`);
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };

    const body: string = JSON.stringify(address);

    const res: AddressesPATCHRequest = await req.patch<AddressesPATCHRequest>(body, headers);

    return res.data;
  };

  deleteAddress = async (token, id: string) : Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ADDRESSES_SERVICE_URL, `addresses/${id}`);
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };

    await req.delete<AddressesDELETERequest>('', headers);
  };
}

export default AddressServiceFetch;
