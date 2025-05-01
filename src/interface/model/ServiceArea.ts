import Attribute from './Attribute';
import Metadata from './Metadata';

interface ServiceArea {
  id: string;
  service_id?: string;
  service_at_location_id?: string;
  name?: string;
  description?: string;
  extent?: string;
  extent_type?: string;
  uri?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default ServiceArea;
