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
  'valid_dates.0': {
    parser: (valid_from: string) => new Dayjs(valid_from),
    inputPath: 'valid_from',
  },
  'valid_dates.1': {
    parser: (valid_to: string) => new Dayjs(valid_to),
    inputPath: 'valid_to',
  },
  'occurrence.0': {
    parser: (dtstart: string) => new Dayjs(dtstart),
    inputPath: 'dtstart',
  },
  'occurrence.1': {
    parser: (until: string) => new Dayjs(until),
    inputPath: 'until',
  },
  'valid_hours.0': {
    parser: (opens_at: string) => new Dayjs(opens_at),
    inputPath: 'opens_at',
  },
  'valid_hours.1': {
    parser: (closes_at: string) => new Dayjs(closes_at),
    inputPath: 'closes_at',
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
