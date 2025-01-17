import Attribute from './Attribute';
import Metadata from './Metadata';

interface RequiredDocument {
  id: string;
  document: string;
  uri: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default RequiredDocument;
