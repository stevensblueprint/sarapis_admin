import { Button, Typography } from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import DatasyncTable from '../components/DatasyncTable';

const { Title } = Typography;

const Datasync = () => {
  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Data Sync
          </Title>
          <div>
            <Button
              type="primary"
              shape="round"
              className="mr-2"
              icon={<PlusOutlined />}
            />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} />
          </div>
        </div>
        <DatasyncTable dataSource={null} />
      </div>
    </div>
  );
};

export default Datasync;
