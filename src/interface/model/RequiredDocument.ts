import Attribute from './Attribute';
import Metadata from './Metadata';

interface RequiredDocument {
  id: string;
  service_id: string | null;
  document: string | null;
  uri: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default RequiredDocument;
