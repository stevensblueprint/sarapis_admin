import Attribute from './Attribute';
import Metadata from './Metadata';

interface Address {
  id: string;
  location_id: string | null;
  attention: string | null;
  address_1: string;
  address_2: string | null;
  city: string;
  region: string | null;
  state_province: string;
  postal_code: string;
  country: string;
  address_type: string;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Address;
