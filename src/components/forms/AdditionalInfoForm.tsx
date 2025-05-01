import { Table, Form, Input, Button } from 'antd';

const AdditionalInfoForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item label="Capacities" name="capacities">
          <Table></Table>
        </Form.Item>
        <Form.Item label="Funding" name="funding">
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
