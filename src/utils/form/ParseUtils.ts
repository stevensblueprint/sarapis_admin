import LinkType from '../../interface/model/LinkType';
import TaxonomyTerm from '../../interface/model/TaxonomyTerm';
import Taxonomy from '../../interface/model/Taxonomy';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

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

export const scheduleParser: Record<string, ParseFieldEntry> = {
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
  dtstart: {
    parser: (occurrence: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      occurrence?.[0]?.format('YYYY-MM-DD') ?? undefined,
    inputPath: 'occurrence',
  },
  until: {
    parser: (occurrence: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      occurrence?.[1]?.format('YYYY-MM-DD') ?? undefined,
    inputPath: 'occurrence',
  },
  opens_at: {
    parser: (valid_hours: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      valid_hours?.[0]?.format('HH:mm') ?? undefined,
    inputPath: 'valid_hours',
  },
  closes_at: {
    parser: (valid_hours: [Dayjs | undefined, Dayjs | undefined] | undefined) =>
      valid_hours?.[1]?.format('HH:mm') ?? undefined,
    inputPath: 'valid_hours',
  },
  timezone: {
    parser: (timezone: number) => timezone ?? 0,
  },
  byday: {
    parser: (arr: string[]) => arr?.join(',') ?? undefined,
  },
  byweekno: {
    parser: (arr: string[]) => arr?.join(',') ?? undefined,
  },
  bymonthday: {
    parser: (arr: string[]) => arr?.join(',') ?? undefined,
  },
  byyearday: {
    parser: (arr: string[]) => arr?.join(',') ?? undefined,
  },
};

export const reverseScheduleParser: Record<string, ParseFieldEntry> = {
  valid_dates: {
    parser: (values: [string | null, string | null]) =>
      values[0] && values[1]
        ? [dayjs(values[0], 'YYYY-MM-DD'), dayjs(values[1], 'YYYY-MM-DD')]
        : undefined,
    inputPath: ['valid_from', 'valid_to'],
  },
  occurrence: {
    parser: (values: [string | null, string | null]) =>
      values[0] && values[1]
        ? [dayjs(values[0], 'YYYY-MM-DD'), dayjs(values[1], 'YYYY-MM-DD')]
        : undefined,
    inputPath: ['dtstart', 'until'],
  },
  valid_hours: {
    parser: (values: [string | null, string | null]) =>
      values[0] && values[1]
        ? [dayjs(values[0], 'HH:mm'), dayjs(values[1], 'HH:mm')]
        : undefined,
    inputPath: ['opens_at', 'closes_at'],
  },
  byday: {
    parser: (arr: string) => arr?.split(',') ?? undefined,
  },
  byweekno: {
    parser: (arr: string) => arr?.split(',') ?? undefined,
  },
  bymonthday: {
    parser: (arr: string) => arr?.split(',') ?? undefined,
  },
  byyearday: {
    parser: (arr: string) => arr?.split(',') ?? undefined,
  },
};
