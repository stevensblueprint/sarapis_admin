import ExportData from '../interface/model/ExportData';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Format',
    dataIndex: 'format',
  },
  {
    title: 'Mode',
    dataIndex: 'mode',
  },
  {
    title: 'Last Import',
    dataIndex: 'last_import',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

interface ExportDataProps {
  dataSource: ExportData[] | null;
}

const ExportDataTable = ({ dataSource }: ExportDataProps) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ExportDataTable;
