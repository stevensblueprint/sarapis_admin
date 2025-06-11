import Attribute from './Attribute';
import Metadata from './Metadata';

interface Language {
  id?: string;
  service_id?: string;
  location_id?: string;
  phone_id?: string;
  name?: string;
  code?: string;
  note?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}
export default Language;
