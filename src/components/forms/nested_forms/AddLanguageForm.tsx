import { Form, Tooltip, Input } from 'antd';
import { JSX, forwardRef, useImperativeHandle } from 'react';

const AddLanguageForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

  return (
    <>
      {' '}
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-2/3"
          label={
            <Tooltip
              placement="topLeft"
              title="The name of the language in which the service is delivered."
            >
              Name
            </Tooltip>
          }
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-1/3"
          label={
            <Tooltip
              placement="topLeft"
              title="The ISO 639-1 or ISO 639-3 code for the language."
            >
              Code
            </Tooltip>
          }
          name="code"
        >
          <Input />
        </Form.Item>
      </div>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A free text description of any additional context or services provided for this language."
          >
            Note
          </Tooltip>
        }
        name="note"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </>
  );
});

export default AddLanguageForm;
