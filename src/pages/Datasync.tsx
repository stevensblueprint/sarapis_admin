import { Table, Button, Typography } from 'antd';
import ImportDataSourceTable from '../components/ImportDataSourceTable';

const { Title } = Typography;

const Datasync = () => {
  return (
    <div className="m-10">
      <div className="flex flex-row justify-between">
        <Title className="mb-4" level={3}>
          Data Source
        </Title>
        <Button>Add Source</Button>
      </div>
      <ImportDataSourceTable dataSource={null} />
    </div>
  );
};

export default Datasync;
