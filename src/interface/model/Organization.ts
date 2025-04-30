import Funding from './Funding';
import Contact from './Contact';
import Phone from './Phone';
import Location from './Location';
import OrganizationIdentifier from './OrganizationIdentifier';
import Attribute from './Attribute';
import Metadata from './Metadata';
import { Service } from './Service';

interface Organization {
  id: string;
  name: string;
  alternate_name: string | null;
  description: string;
  email: string | null;
  website: string | null;
  additional_websites: string[] | null;
  year_incorporated: number | null;
  legal_status: string | null;
  logo: string | null;
  uri: string | null;
  parent_organization_id: string | null;
  funding: Funding[] | null;
  contacts: Contact[] | null;
  phones: Phone[] | null;
  locations: Location[] | null;
  organizationIdentifiers: OrganizationIdentifier[] | null;
  services: Service[] | null;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default Organization;
