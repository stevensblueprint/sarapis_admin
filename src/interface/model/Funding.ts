import Attribute from './Attribute';
import Metadata from './Metadata';

interface Funding {
  id: string;
  organization_id: string | null;
  service_id: string | null;
  source: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Funding;
