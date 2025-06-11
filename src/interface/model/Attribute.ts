import Metadata from './Metadata';
import TaxonomyTerm from './TaxonomyTerm';

interface Attribute {
  id?: string;
  link_id?: string;
  link_type?: string;
  link_entity?: string;
  value?: string;
  taxonomy_term?: TaxonomyTerm;
  metadata?: Metadata[];
  label?: string;
}

export default Attribute;
