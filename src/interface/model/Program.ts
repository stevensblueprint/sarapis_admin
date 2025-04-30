import Attribute from './Attribute';
import Metadata from './Metadata';

interface Program {
  id: string;
  organization_id: string | null;
  name: string;
  alternate_name: string | null;
  description: string;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Program;
