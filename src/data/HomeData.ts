import type { MenuProps } from 'antd';

export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disabledCheckbox?: boolean;
}

export const typesOfServicesOptions: Option[] = [
  {
    label: 'Care',
    value: 'care',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Emergency',
    value: 'emergency',
  },
  {
    label: 'Food',
    value: 'food',
  },
  {
    label: 'Goods',
    value: 'goods',
  },
  {
    label: 'Health',
    value: 'health',
  },
  {
    label: 'Housing',
    value: 'housing',
  },
  {
    label: 'Legal',
    value: 'legal',
  },
  {
    label: 'Money',
    value: 'money',
  },
  {
    label: 'Transit',
    value: 'transit',
  },
  {
    label: 'Work',
    value: 'work',
  },
];

export const sortByOptions: Option[] = [
  {
    label: 'Service Name',
    value: 'serviceName',
  },
  {
    label: 'Organization Name',
    value: 'organizationName',
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

export const servicesList = [
  {
    id: 1,
    name: '"KUEHNER PLACE, SHELTER FOR ABUSE ELDERLY AND NEGLECTED"',
    organizationId: 1,
    organizationName: 'KUEHNER PLACE, SHELTER FOR ABUSE ELDERLY AND NEGLECTED',
    description: 'Provides coalition for the Homeless, Headquarters services',
    location: ['1667 Good Hope Rd SE Washington DC 20020'],
    serviceEligibility: ['Employment Status', 'Unemployment'],
  },
  {
    id: 2,
    name: '"Milestones" Supervised Visitation',
    organizationId: 2,
    organizationName: 'Google',
    description: 'A platform for building mobile and desktop web applications',
    location: ['Mountain View, CA'],
    phone: '987-654-3210',
    serviceCategory: 'Technology',
    serviceEligibility: ['Developers', 'Designers'],
  },
  {
    id: 3,
    name: 'Vue',
    organizationId: 3,
    organizationName: 'Evan You',
    description: 'The Progressive JavaScript Framework',
    location: ['Remote'],
    phone: '555-555-5555',
    serviceCategory: 'Technology',
    serviceEligibility: ['Developers', 'Designers'],
  },
  {
    id: 4,
    name: 'Svelte',
    organizationId: 4,
    organizationName: 'Svelte Society',
    description: 'Cybernetically enhanced web apps',
    location: ['Anywhere'],
    phone: '444-444-4444',
    serviceCategory: 'Technology',
    serviceEligibility: ['Developers', 'Designers'],
  },
];
