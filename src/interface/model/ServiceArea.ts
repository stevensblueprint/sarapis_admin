import Attribute from './Attribute';
import Metadata from './Metadata';

interface ServiceArea {
  id: string;
  service_id: string | null;
  service_at_location_id: string | null;
  name: string | null;
  description: string | null;
  extent: string | null;
  extent_type: string | null;
  uri: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default ServiceArea;
