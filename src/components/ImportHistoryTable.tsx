import ImportHistory from '../interface/model/ImportHistory';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Time Stamp',
    dataIndex: 'time_stamp',
  },
  {
    title: 'Source',
    dataIndex: 'source',
  },
  {
    title: 'Auto',
    dataIndex: 'auto',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

interface ImportHistoryProps {
  dataSource: ImportHistory[] | null;
}

const ImportHistoryTable = ({ dataSource }: ImportHistoryProps) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ImportHistoryTable;
