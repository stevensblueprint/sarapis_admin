import { Table, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ContactForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Contacts</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="contacts"
        >
          <Table></Table>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Phones</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="phones"
        >
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default ContactForm;
