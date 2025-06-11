import Language from './Language';
import Contact from './Contact';
import Phone from './Phone';
import Schedule from './Schedule';
import Address from './Address';
import Attribute from './Attribute';
import Metadata from './Metadata';
import Accessibility from './Accessibility';

export enum LocationType {
  virtual = 'virtual',
  physical = 'physical',
  postal = 'postal',
}

interface Location {
  id?: string;
  location_type?: LocationType;
  url?: string;
  organization_id?: string;
  name?: string;
  alternate_name?: string;
  description?: string;
  transportation?: string;
  latitude?: number;
  longitude?: number;
  external_identifier?: string;
  external_identifier_type?: string;
  languages?: Language[];
  addresses?: Address[];
  contacts?: Contact[];
  accessibility?: Accessibility[];
  phones?: Phone[];
  schedules?: Schedule[];
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Location;
