import Attribute from './Attribute';
import Metadata from './Metadata';

interface Url {
  id?: string;
  label?: string;
  url?: string;
  organization_id?: string;
  service_id?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Url;
