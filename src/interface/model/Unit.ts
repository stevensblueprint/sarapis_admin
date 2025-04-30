import Attribute from './Attribute';
import Metadata from './Metadata';

interface Unit {
  id: string;
  name: string;
  scheme: string | null;
  identifier: string | null;
  uri: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Unit;
