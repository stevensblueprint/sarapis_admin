import Attribute from './Attribute';
import Metadata from './Metadata';

interface Accessibility {
  id: string;
  location_id?: string;
  description?: string;
  details?: string;
  url?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Accessibility;
