import ImportData from '../interface/model/ImportData';
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
    title: 'Status',
    dataIndex: 'status',
  },
];

interface ImportDataProps {
  dataSource: ImportData[] | null;
}

const ImportDataTable = ({ dataSource }: ImportDataProps) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ImportDataTable;
