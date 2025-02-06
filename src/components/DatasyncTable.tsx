import DatasyncSource from '../interface/model/DatasyncSource';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Request Type',
    dataIndex: 'request_type',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
  },
  {
    title: 'Format',
    dataIndex: 'format',
  },
  {
    title: 'Files',
    dataIndex: 'files',
  },
  {
    title: 'Size',
    dataIndex: 'size',
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
