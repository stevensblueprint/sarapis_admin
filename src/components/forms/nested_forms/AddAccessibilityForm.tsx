import { Form, Input, Tooltip } from 'antd';
import { JSX } from 'react';

const AddAccessibilityForm = (): JSX.Element => {
  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="The URL of a page giving more information about the accessibility of the location."
          >
            URL
          </Tooltip>
        }
        name="url"
        rules={[{ type: 'url', message: 'Invalid URL!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A free text description of the assistance or infrastructure that facilitates access to clients with disabilities."
          >
            Description
          </Tooltip>
        }
        name="description"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="Any further details relating to the relevant accessibility arrangements at this location."
          >
            Details
          </Tooltip>
        }
        name="details"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </>
  );
};

export default AddAccessibilityForm;
