import DatasyncSource from '../interface/model/DatasyncSource';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'Request Type',
    dataIndex: 'request_type',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 130,
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    width: 200,
  },
  {
    title: 'Format',
    dataIndex: 'format',
    width: 150,
  },
  {
    title: 'Files',
    dataIndex: 'files',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    width: 150,
  },
];

interface DatasyncSourceProps {
  dataSource: DatasyncSource[] | null;
}

const DatasyncTable = ({ dataSource }: DatasyncSourceProps) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default DatasyncTable;
