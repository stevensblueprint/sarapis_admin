import LinkType from '../../interface/model/LinkType';
import TaxonomyTerm from '../../interface/model/TaxonomyTerm';
import Taxonomy from '../../interface/model/Taxonomy';

import { ParseFieldEntry } from './FormUtils';

export const attributeParser: Record<string, ParseFieldEntry> = {
  link_type: {
    parser: (value: string) => JSON.parse(value) as LinkType,
  },
  taxonomy_term: {
    parser: (value: string) => JSON.parse(value) as TaxonomyTerm,
  },
  'taxonomy_term.taxonomy_detail': {
    parser: (value: string) => JSON.parse(value) as Taxonomy,
    inputPath: 'taxonomy',
  },
};
