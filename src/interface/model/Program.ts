import Attribute from './Attribute';
import Metadata from './Metadata';

interface Program {
  id: string;
  name: string;
  alternateName: string;
  description: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Program;
