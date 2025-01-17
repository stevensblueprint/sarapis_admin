import Attribute from './Attribute';
import Metadata from './Metadata';
import Unit from './Unit';

interface ServiceCapacity {
  id: string;
  unit: Unit | null;
  available: number;
  maximum: number;
  description: string;
  upated: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default ServiceCapacity;
