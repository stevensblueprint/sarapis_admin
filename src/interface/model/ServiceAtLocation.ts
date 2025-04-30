import Phone from './Phone';
import ServiceArea from './ServiceArea';
import Schedule from './Schedule';
import Attribute from './Attribute';
import Metadata from './Metadata';
import Contact from './Contact';
import Location from './Location';

interface ServiceAtLocation {
  id: string;
  service_id: string | null;
  description: string | null;
  service_areas: ServiceArea[] | null;
  contacts: Contact[] | null;
  phones: Phone[] | null;
  schedules: Schedule[] | null;
  location: Location[] | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default ServiceAtLocation;
