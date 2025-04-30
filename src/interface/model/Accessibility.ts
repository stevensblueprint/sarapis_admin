import Attribute from './Attribute';
import Metadata from './Metadata';

interface Accessibility {
  id: string;
  location_id: string | null;
  description: string | null;
  details: string | null;
  url: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Accessibility;
