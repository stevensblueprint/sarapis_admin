import Attribute from './Attribute';
import Metadata from './Metadata';

interface Program {
  id?: string;
  organization_id?: string;
  name?: string;
  alternate_name?: string;
  description?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Program;
