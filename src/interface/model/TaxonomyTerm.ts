import Metadata from './Metadata';
import Taxonomy from './Taxonomy';

interface TaxonomyTerm {
  id: string;
  code?: string;
  name: string;
  description: string;
  parent_id?: string;
  taxonomy?: string;
  taxonomy_detail?: Taxonomy;
  language?: string;
  taxonomy_id?: string;
  term_uri?: string;
  metadata?: Metadata[];
}

export default TaxonomyTerm;
