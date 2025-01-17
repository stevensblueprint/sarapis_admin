import Metadata from './Metadata';
import TaxonomyTerm from './TaxonomyTerm';

interface Attribute {
  id: string;
  linkId: string;
  linkType: string;
  linkEntity: string;
  value: string;
  taxonomyTerm: TaxonomyTerm;
  label: string;
  metadata: Metadata[];
}

export default Attribute;
