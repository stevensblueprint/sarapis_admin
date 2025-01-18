import Funding from './Funding';
import Contact from './Contact';
import Phone from './Phone';
import Location from './Location';
import OrganizationIdentifier from './OrganizationIdentifier';
import Attribute from './Attribute';
import Metadata from './Metadata';
import Url from './Url';

interface Organization {
  id: string;
  name: string;
  alternateName: string;
  description: string;
  email: string;
  website: string;
  additionalWebsites: Url[];
  taxStatus: string;
  taxId: string;
  yearIncorporated: number;
  legalStatus: string;
  logo: string;
  uri: string;
  parentOrganization: Organization | null;
  funding: Funding[];
  contacts: Contact[];
  phones: Phone[];
  locations: Location[];
  organizationIdentifiers: OrganizationIdentifier[];
  attributes: Attribute[];
  metadata: Metadata[];
}

export default Organization;
