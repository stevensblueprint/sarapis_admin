import LinkType from '../../interface/model/LinkType';
import TaxonomyTerm from '../../interface/model/TaxonomyTerm';
import Taxonomy from '../../interface/model/Taxonomy';
import { Dayjs } from 'dayjs';

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

export const costOptionParser: Record<string, ParseFieldEntry> = {
  valid_from: {
    parser: (valid_dates: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      valid_dates?.[0]?.format('YYYY-MM-DD') ?? undefined,
    inputPath: 'valid_dates',
  },
  valid_to: {
    parser: (valid_dates: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      valid_dates?.[1]?.format('YYYY-MM-DD') ?? undefined,
    inputPath: 'valid_dates',
  },
};
