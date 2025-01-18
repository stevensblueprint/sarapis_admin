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
