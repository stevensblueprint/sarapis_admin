import Attribute from './Attribute';
import Metadata from './Metadata';

interface Unit {
  id?: string;
  name?: string;
  scheme?: string;
  identifier?: string;
  uri?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Unit;
