import { Form, Input, Tooltip } from 'antd';
import { JSX } from 'react';

const AddFundingForm = (): JSX.Element => {
  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A free text description of the source of funds for this organization or service."
          >
            Source
          </Tooltip>
        }
        name="source"
        rules={[{ required: true, message: 'Required Field!' }]}
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </>
  );
};

export default AddFundingForm;
