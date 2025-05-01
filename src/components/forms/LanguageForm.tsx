import { Table, Input, Form } from 'antd';

const LanguageForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-2 w-3/4">
        <Form.Item label="Languages" name="languages">
          <Table></Table>
        </Form.Item>
        <Form.Item
          className="w-2/3 self-center"
          label="Interpretation Services"
          name="interpretation_services"
        >
          <Input.TextArea />
        </Form.Item>
      </div>
    </div>
  );
};

export default LanguageForm;
