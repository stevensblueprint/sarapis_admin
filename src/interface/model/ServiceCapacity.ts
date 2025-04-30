import Attribute from './Attribute';
import Metadata from './Metadata';
import Unit from './Unit';

interface ServiceCapacity {
  id: string;
  service_id: string | null;
  unit: Unit;
  available: number;
  maximum: number | null;
  description: string | null;
  updated: string;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default ServiceCapacity;
