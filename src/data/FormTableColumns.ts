import { ColumnsType } from 'antd/es/table';

export const addressColumns: ColumnsType = [
  {
    title: 'Address',
    dataIndex: 'address_1',
    width: '70%',
    ellipsis: true,
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: '20%',
    ellipsis: true,
  },
];

export const contactColumns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    ellipsis: true,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: '25%',
    ellipsis: true,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    width: '20%',
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '25%',
    ellipsis: true,
  },
];

export const accessibilityColumns: ColumnsType = [
  {
    title: 'Description',
    dataIndex: 'description',
    width: '90%',
    ellipsis: true,
  },
];

export const phoneColumns: ColumnsType = [
  {
    title: 'Number',
    dataIndex: 'number',
    width: '25%',
    ellipsis: true,
  },
  {
    title: 'Extension',
    dataIndex: 'extension',
    width: '15%',
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '50%',
    ellipsis: true,
  },
];

export const scheduleColumns: ColumnsType = [
  {
    title: 'Opens At',
    dataIndex: 'opens_at',
    width: '15%',
    ellipsis: true,
  },
  {
    title: 'Closes At',
    dataIndex: 'closes_at',
    width: '15%',
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '60%',
    ellipsis: true,
  },
];

export const languageColumns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%',
    ellipsis: true,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: '60%',
    ellipsis: true,
  },
];

export const serviceAreaColumns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%',
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '60%',
    ellipsis: true,
  },
];
