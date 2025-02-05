import { Table, Button, Typography } from 'antd';
import ImportDataSourceTable from '../components/ImportDataSourceTable';
import ImportHistoryTable from '../components/ImportHistoryTable';

const { Title } = Typography;

const Datasync = () => {
  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Data Source
          </Title>
          <Button type="primary">Add Source</Button>
        </div>
        <ImportDataSourceTable dataSource={null} />
      </div>
      <div className="m-10">
        <Title className="mb-4" level={3}>
          Import History
        </Title>
        <ImportHistoryTable dataSource={null} />
      </div>
    </div>
  );
};

export default Datasync;
