import { TableProps } from 'antd';
import Phone from '../interface/model/Phone';

export const phoneTypeOptions = [
  { value: 'voice', label: 'Voice' },
  { value: 'intakeLine', label: 'Intake Line' },
  { value: 'hotline', label: 'Hotline' },
  { value: 'spanishLine', label: 'Spanish Line' },
  { value: 'text', label: 'Text' },
  { value: 'tty', label: 'TTY' },
  { value: 'fax', label: 'Fax' },
];

export const langaugeOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'vietnamese', label: 'Vietnamese' },
];

export const phoneTableColumns: TableProps<Phone>['columns'] = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Extension',
    dataIndex: 'extension',
    key: 'extension',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Language(s)',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];
