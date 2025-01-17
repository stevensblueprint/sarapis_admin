import Language from './Language';
import Attribute from './Attribute';
import Metadata from './Metadata';

interface Phone {
  id: string;
  number: string;
  extension: string;
  type: string;
  description: string;
  languages: Language[];
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Phone;
