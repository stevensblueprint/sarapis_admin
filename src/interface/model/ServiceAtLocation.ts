import Phone from './Phone';
import ServiceArea from './ServiceArea';
import Schedule from './Schedule';
import Attribute from './Attribute';
import Metadata from './Metadata';
import Contact from './Contact';
import Location from './Location';

interface ServiceAtLocation {
  id: string;
  service_id?: string;
  description?: string;
  service_areas?: ServiceArea[];
  contacts?: Contact[];
  phones?: Phone[];
  schedules?: Schedule[];
  location?: Location[];
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default ServiceAtLocation;
