import Attribute from './Attribute';
import Metadata from './Metadata';

interface Url {
  id: string;
  label: string | null;
  url: string;
  organization_id: string | null;
  service_id: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Url;
