import { MenuProps } from 'antd';

export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disabledCheckbox?: boolean;
}

export const sortByOptions: Option[] = [
  {
    label: 'Most Recently Updated',
    value: 'mostRecentlyUpdated',
  },
  {
    label: 'Least Recently Updated',
    value: 'leastRecentlyUpdated',
  },
];

export const resulsPerPageOptions: Option[] = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
];

export const items: MenuProps['items'] = [
  {
    label: 'Download CSV',
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: 'Download PDF',
    key: '1',
  },
];

export const legalStatusOptions = [
  { value: '1', label: 'Non-profit' },
  { value: '2', label: 'Private Corporation' },
  { value: '3', label: 'Government' },
  { value: '4', label: 'Other' },
];
