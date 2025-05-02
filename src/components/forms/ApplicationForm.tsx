import { Form, Input, InputNumber, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ApplicationForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center gap-4">
        <div className="w-1/3 flex flex-col">
          <Form.Item label="Application Process" name="application_process">
            <Input.TextArea rows={5} />
          </Form.Item>
          <div className="flex flex-row justify-between gap-4">
            <Form.Item label="Minimum Age" name="minimum_age">
              <InputNumber className="w-[100%]" />
            </Form.Item>
            <Form.Item label="Maximum Age" name="maximum_age">
              <InputNumber className="w-[100%]" />
            </Form.Item>
          </div>
        </div>
        <div className="w-1/3">
          <Form.Item label="Fees Description" name="fees_description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Eligibility Description"
            name="eligibility_description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-3/4 self-center">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Required Documents</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="required_documents"
        >
          <Table></Table>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Cost Options</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="cost_options"
        >
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default ApplicationForm;
