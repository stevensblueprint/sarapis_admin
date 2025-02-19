import { Space, TableProps, type MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import Program from '../interface/model/Program';

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

export interface ProgramTableDataType {
  id: string;
  key: string;
  name: string;
  alternateName: string;
  description: string;
}

export const programTableColumns: TableProps<Program>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link
        to={`/services/${record.id}`}
        className="text-blue-500 hover:underline"
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Alternate Name',
    dataIndex: 'alternateName',
    key: 'alternateName',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="middle">
        <a>Delete</a> {/* TODO: Handle Delete */}
      </Space>
    ),
  },
];

//   Example "Services" data array.
//   In a real app, you'll fetch this from a backend and store it in state or props.
export const servicesData = [
  {
    id: 1,
    title: 'Workforce Development',
    description:
      'Throughout our many years of service, A Wider Circle has seen far too few people rise out of poverty...',
    phone: '(301) 608-3508',
    address: '9159 Brookville Road Silver Spring MD 20910',
    categories: ['Work', 'Skills & Training'],
    eligibility: ['Unemployed', 'Employment Status'],
  },
  {
    id: 2,
    title: 'Partnership to Independence',
    description:
      'The Partnership to Independence (P2I) is a new initiative based on 17 years of working with individuals and families...',
    phone: '(301) 608-3508',
    address: '9159 Brookville Road Silver Spring MD 20910',
    categories: ['Education', 'Financial Education', 'Health Education'],
    eligibility: [],
  },
  {
    id: 3,
    title: 'Test',
    description: 'Testing the 3rd item',
    phone: '(956) 608-3508',
    address: ' Nightware Silver Spring MD 20910',
    categories: [
      'Example 1',
      'Example 2',
      'Example 3',
      'Example 4',
      'Example 5',
    ],
    eligibility: [
      'Example 1',
      'Example 2',
      'Example 3',
      'Example 4',
      'Example 5',
    ],
  },
];

//   Example "Locations" data array.
//   Again, you can fetch from your backend or store locally in state/props.
export const locationsData = [
  {
    id: 1,
    title: 'A Wider Circle Center for Community Service',
    address: '9159 Brookville Road Silver Spring MD 20910',
    phone: '(301) 608-3508',
  },
  {
    id: 2,
    title: 'A Wider Circle Mailing Address',
    address: '4808 Moorland Lane Bethesda MD 20814',
    phone: '(301) 608-3508, (301) 608-3504',
  },
  {
    id: 3,
    title: 'test 3 Items',
    address: '788888 Big Guy Lane Bethesda MD 20814',
    phone: '(301) 608-3508, (301) 608-3504',
  },
];
