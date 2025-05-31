import Attribute from './Attribute';
import Metadata from './Metadata';
import Unit from './Unit';

interface ServiceCapacity {
  id?: string;
  service_id?: string;
  unit?: Unit;
  available?: number;
  maximum?: number;
  description?: string;
  updated?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default ServiceCapacity;
