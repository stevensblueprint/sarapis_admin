import Attribute from './Attribute';
import Metadata from './Metadata';

interface Funding {
  id: string;
  organization_id?: string;
  service_id?: string;
  source?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Funding;
