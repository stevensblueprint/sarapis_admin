import { Form, Tooltip, Input } from 'antd';
import { JSX, forwardRef, useImperativeHandle } from 'react';

const AddRequiredDocumentForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A free text description of the document required to apply for or receive the service."
          >
            Document
          </Tooltip>
        }
        name="document"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip placement="topLeft" title="A web link to the document.">
            URI
          </Tooltip>
        }
        name="uri"
        rules={[
          {
            type: 'url',
            message: 'Invalid URL!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
});

export default AddRequiredDocumentForm;
