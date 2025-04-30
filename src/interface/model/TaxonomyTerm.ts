import Metadata from './Metadata';
import Taxonomy from './Taxonomy';

interface TaxonomyTerm {
  id: string;
  code: string | null;
  name: string;
  description: string;
  parent_id: string | null;
  taxonomy: string | null;
  taxonomy_detail: Taxonomy | null;
  language: string | null;
  taxonomy_id: string | null;
  term_uri: string | null;
  metadata: Metadata[] | null;
}

export default TaxonomyTerm;
