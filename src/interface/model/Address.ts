import Attribute from './Attribute';
import Metadata from './Metadata';

interface Address {
  id: string;
  location_id?: string;
  attention?: string;
  address_1: string;
  address_2?: string;
  city: string;
  region?: string;
  state_province: string;
  postal_code: string;
  country: string;
  address_type: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Address;
