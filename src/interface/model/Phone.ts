import Language from './Language';
import Attribute from './Attribute';
import Metadata from './Metadata';

interface Phone {
  id: string;
  location_id?: string;
  service_id?: string;
  organization_id?: string;
  contact_id?: string;
  service_at_location_id?: string;
  number: string;
  extension?: string;
  type?: string;
  description?: string;
  languages?: Language[];
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Phone;
