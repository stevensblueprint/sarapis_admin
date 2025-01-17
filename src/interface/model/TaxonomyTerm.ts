import Metadata from './Metadata';
import Taxonomy from './Taxonomy';

interface TaxonomyTerm {
  id: string;
  code: string;
  name: string;
  description: string;
  parent: TaxonomyTerm | null;
  taxonomy: string;
  taxonomyDetail: Taxonomy | null;
  language: string;
  termUri: string;
  metadata: Metadata[];
}

export default TaxonomyTerm;
