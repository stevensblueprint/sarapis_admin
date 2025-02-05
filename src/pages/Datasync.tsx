import { Button, Typography } from 'antd';
import ExportDataTable from '../components/ExportDataTable';
import ImportDataTable from '../components/ImportDataTable';

const { Title } = Typography;

const Datasync = () => {
  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Import Data
          </Title>
          <Button type="primary">Add Sources</Button>
        </div>
        <ImportDataTable dataSource={null} />
      </div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Export Data
          </Title>
          <Button type="primary">Download</Button>
        </div>
        <ExportDataTable dataSource={null} />
      </div>
    </div>
  );
};

export default Datasync;
