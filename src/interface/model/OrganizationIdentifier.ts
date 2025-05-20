import Attribute from './Attribute';
import Metadata from './Metadata';

interface OrganizationIdentifier {
  id?: string;
  organization_id?: string;
  identifier_scheme?: string;
  identifier_type?: string;
  identifier?: string;
  attributes?: Attribute[];
  metadata?: Metadata[];
}

export default OrganizationIdentifier;
