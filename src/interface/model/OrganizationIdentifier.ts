import Attribute from './Attribute';
import Metadata from './Metadata';

interface OrganizationIdentifier {
  id: string;
  organization_id: string | null;
  identifier_scheme: string | null;
  identifier_type: string;
  identifier: string;
  attributes: Attribute[] | null;
  metadata: Metadata[] | null;
}

export default OrganizationIdentifier;
