import Attribute from './Attribute';
import Metadata from './Metadata';

interface Funding {
  id: string;
  name: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Funding;
