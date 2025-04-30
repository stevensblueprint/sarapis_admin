import Attribute from './Attribute';
import Metadata from './Metadata';
import Phone from './Phone';

interface Contact {
  id: string;
  organization_id: string | null;
  service_id: string | null;
  service_at_location_id: string | null;
  location_id: string | null;
  name: string | null;
  title: string | null;
  department: string | null;
  email: string | null;
  phones: Phone[] | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}
export default Contact;
