import { Form, Input, InputNumber, DatePicker, Tooltip } from 'antd';
import { forwardRef, JSX, useImperativeHandle } from 'react';

const AddCapacityForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-1/2">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title='The human-readable name for this unit e.g. “Bed” or “Hours"'
              >
                Name
              </Tooltip>
            }
            name={['unit', 'name']}
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The identifier of the unit taken from the scheme if applicable e.g. kgm for Kilogram."
              >
                Identifier
              </Tooltip>
            }
            name={['unit', 'identifier']}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-row gap-4">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The number of units available as of the last update."
                >
                  Available
                </Tooltip>
              }
              name="available"
              rules={[{ required: true, message: 'Required field!' }]}
            >
              <InputNumber className="w-auto" />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The maximum number of units that can be available for this service, if applicable."
                >
                  Maximum
                </Tooltip>
              }
              name="maximum"
            >
              <InputNumber className="w-auto" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The scheme which formalizes the unit, if applicable e.g. “SI” for Standard International Units such as Kilogram, Litre, etc."
              >
                Scheme
              </Tooltip>
            }
            name={['unit', 'scheme']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The URI to the definition of the unit, if applicable"
              >
                URI
              </Tooltip>
            }
            name={['unit', 'uri']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The datetime when this capacity was last updated or changed."
              >
                Last Updated
              </Tooltip>
            }
            name="updated"
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss.SSS"
              showTime
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A Human-Friendly description of this service capacity e.g. “Beds available for people experiencing homelessness”."
          >
            Description
          </Tooltip>
        }
        name="description"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </>
  );
});

export default AddCapacityForm;
