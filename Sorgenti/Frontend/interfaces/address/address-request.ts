import { Address } from './address';

export interface AddressesGETRequest {
  data: Address[]
}

export interface AddressGETRequest {
  data: Address
}

export interface AddressesPOSTRequest {
  data: Address
}

export interface AddressesPATCHRequest {
  data: Address
}

export interface AddressesDELETERequest { }
