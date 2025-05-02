import { Table, Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const LanguageForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-2 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Languages</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="languages"
        >
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
