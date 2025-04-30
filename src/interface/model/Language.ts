import Attribute from './Attribute';
import Metadata from './Metadata';

interface Language {
  id: string;
  service_id: string | null;
  location_id: string | null;
  phone_id: string | null;
  name: string | null;
  code: string | null;
  note: string | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}
export default Language;
