import Metadata from './Metadata';
import TaxonomyTerm from './TaxonomyTerm';

interface Attribute {
  id: string;
  link_id: string | null;
  link_type: string | null;
  link_entity: string | null;
  value: string | null;
  taxonomy_term: TaxonomyTerm | null;
  metadata: Metadata[] | null;
  label: string | null;
}

export default Attribute;
