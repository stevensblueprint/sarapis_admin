import { Form, Tooltip, Input } from 'antd';
import { JSX } from 'react';

const AddURLForm = (): JSX.Element => {
  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="The human-readable label for this url e.g. “Twitter” or “Website”."
          >
            Name
          </Tooltip>
        }
        name="label"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="The URL for this URL object. This must be formatted as a valid URI."
          >
            URL
          </Tooltip>
        }
        name="url"
        rules={[
          {
            type: 'url',
            message: 'Invalid URL!',
          },
          {
            required: true,
            message: 'URL is required!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default AddURLForm;
