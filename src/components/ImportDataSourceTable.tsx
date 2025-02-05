import ImportDataSource from '../interface/model/ImportDataSource';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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
    title: 'Auto',
    dataIndex: 'auto',
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

interface ImportDataSourceProps {
  dataSource: ImportDataSource[] | null;
}

const ImportDataSourceTable = ({ dataSource }: ImportDataSourceProps) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ImportDataSourceTable;
