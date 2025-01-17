import Language from './Language';
import Contact from './Contact';
import Phone from './Phone';
import Schedule from './Schedule';
import Address from './Address';
import Attribute from './Attribute';
import Metadata from './Metadata';
import Accessibility from './Accessibility';

interface Location {
  id: string;
  locationType: string;
  url: string;
  name: string;
  alternateName: string;
  description: string;
  transportation: string;
  latitude: number;
  longitude: number;
  externalIdentifier: string;
  externalIdentifierType: string;
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
