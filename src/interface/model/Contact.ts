import Attribute from './Attribute';
import Metadata from './Metadata';
import Phone from './Phone';

interface Contact {
  id?: string;
  organization_id?: string;
  service_id?: string;
  service_at_location_id?: string;
  location_id?: string;
  name?: string;
  title?: string;
  department?: string;
  email?: string;
  phones?: Phone[];
  attributes?: Attribute[];
  metadata?: Metadata[];
}
export default Contact;
