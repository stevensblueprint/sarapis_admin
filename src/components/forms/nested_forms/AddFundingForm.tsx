import { Form, Input, Tooltip } from 'antd';
import { forwardRef, JSX, useImperativeHandle } from 'react';

const AddFundingForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

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
});

export default AddFundingForm;
