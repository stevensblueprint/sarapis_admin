import { TableProps } from 'antd';
import Contact from '../interface/model/Contact';

export const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
];

export const contactTableColumns: TableProps<Contact>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    key: 'visibility',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];
