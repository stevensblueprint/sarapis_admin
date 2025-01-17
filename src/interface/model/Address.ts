import Attribute from './Attribute';
import Metadata from './Metadata';

interface Address {
  id: string;
  attention: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  addressType: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Address;
