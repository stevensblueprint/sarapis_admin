import { TableProps } from 'antd';
import Location from '../interface/model/Location';
import { Link } from 'react-router-dom';

export const adaCompliantOptions = [
  { value: 'adaCompliant', label: 'ADA Compliant' },
  { value: 'notAdaCompliant', label: 'Not ADA Compliant' },
  { value: ' blank', label: 'Blank' },
];

export const locationTableColumns: TableProps<Location>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link to={`/locations/${record.id}`} className="text-blue-500">
        {text}
      </Link>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Zip Code',
    dataIndex: 'zip',
    key: 'zip',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];
