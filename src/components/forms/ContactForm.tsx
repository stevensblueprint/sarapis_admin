import { Table, Form } from 'antd';

const ContactForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item label="Contacts" name="contacts">
          <Table></Table>
        </Form.Item>
        <Form.Item label="Phones" name="phones">
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default ContactForm;
