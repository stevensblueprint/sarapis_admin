import Language from './Language';
import Attribute from './Attribute';
import Metadata from './Metadata';

interface Phone {
  id: string;
  location_id: string | null;
  service_id: string | null;
  organization_id: string | null;
  contact_id: string | null;
  service_at_location_id: string | null;
  number: string;
  extension: string | null;
  type: string | null;
  description: string | null;
  languages: Language[] | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Phone;
