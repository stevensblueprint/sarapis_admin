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
  alternate_name?: string;
  description: string;
  email?: string;
  website?: string;
  additional_websites?: string[];
  year_incorporated?: number;
  legal_status?: string;
  logo?: string;
  uri?: string;
  parent_organization_id?: string;
  funding?: Funding[];
  contacts?: Contact[];
  phones?: Phone[];
  locations?: Location[];
  organizationIdentifiers?: OrganizationIdentifier[];
  services?: Service[];
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default Organization;
