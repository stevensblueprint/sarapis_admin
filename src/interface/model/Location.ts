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
  id: string;
  location_type: string;
  url: string | null;
  organization_id: string | null;
  name: string | null;
  alternate_name: string | null;
  description: string | null;
  transportation: string | null;
  latitude: number | null;
  longitude: number | null;
  external_identifier: string | null;
  external_identifier_type: string | null;
  languages: Language[] | null;
  addresses: Address[] | null;
  contacts: Contact[] | null;
  accessibility: Accessibility[] | null;
  phones: Phone[] | null;
  schedules: Schedule[] | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Location;
