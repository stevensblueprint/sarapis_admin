import { Table, Form, Input, Button } from 'antd';

const AdditionalInfoForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-2 w-3/4">
        <Form.Item label="Capacities" name="capacities">
          <Table></Table>
        </Form.Item>
        <Form.Item label="Funding" name="funding">
          <Table></Table>
        </Form.Item>
        <Form.Item
          className="w-2/3 self-center"
          label="Accreditations"
          name="accreditations"
        >
          <Input.TextArea />
        </Form.Item>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
