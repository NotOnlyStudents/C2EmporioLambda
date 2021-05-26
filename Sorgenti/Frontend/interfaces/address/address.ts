export interface Address {
  id?: string;
  nation: string;
  city: string;
  address: string;
  cap: number;
}

export interface AddressValidation {
  nation: boolean;
  city: boolean;
  address: boolean;
  cap: boolean;
}
