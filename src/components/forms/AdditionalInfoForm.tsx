import { Table, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AdditionalInfoForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Capacities</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="capacities"
        >
          <Table></Table>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Funding</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="funding"
        >
          <Table></Table>
        </Form.Item>
        <div className="flex flex-row gap-4">
          <Form.Item
            className="w-1/2 self-center"
            label="Accreditations"
            name="accreditations"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item className="w-1/2" label="Program" name="program">
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
