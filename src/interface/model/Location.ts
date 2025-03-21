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
  organizationId?: string | null;
  locationType: LocationType | string;
  url?: string | null;
  name?: string | null;
  alternateName?: string | null;
  description?: string | null;
  transportation?: string | null;
  latitude: number;
  longitude: number;
  externalIdentifier?: string | null;
  externalIdentifierType?: string | null;
  languages: Language[];
  addresses: Address[];
  contacts: Contact[];
  accessibility: Accessibility[];
  phones: Phone[];
  schedules: Schedule[];
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Location;
