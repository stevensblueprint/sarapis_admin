import Attribute from './Attribute';
import Metadata from './Metadata';

interface OrganizationIdentifier {
  id: string;
  identifierScheme: string;
  identifierType: string;
  identifier: string;
  attributes: Attribute[];
  metadata: Metadata[];
}

export default OrganizationIdentifier;
