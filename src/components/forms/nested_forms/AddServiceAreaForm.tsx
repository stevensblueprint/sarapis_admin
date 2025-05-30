import { Form, Tooltip, Input, Select } from 'antd';
import { JSX, forwardRef, useImperativeHandle } from 'react';

const AddServiceAreaForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A free text geographic area where a service is available."
          >
            Name
          </Tooltip>
        }
        name="name"
      >
        <Input />
      </Form.Item>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The format of the extent field populated from an enum of “geojson”, “topojson”, “kml”, and (for legacy systems or early state during transformation) “text”."
            >
              Extent Type
            </Tooltip>
          }
          name="extent_type"
        >
          <Select
            options={[
              { value: 'geojson', label: 'GeoJSON' },
              { value: 'topojson', label: 'Topological GeoJSON' },
              { value: 'kml', label: 'Keyhole Markup Language' },
              { value: 'text', label: 'Text' },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="A URI which acts as a persistent identifier to identify an area."
            >
              URI
            </Tooltip>
          }
          name="uri"
          rules={[{ type: 'url', message: 'Invalid URL!' }]}
        >
          <Input />
        </Form.Item>
      </div>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A definition of the polygon defining the area."
          >
            Extent
          </Tooltip>
        }
        name="extent"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="A more detailed free text description of this service area. Used to provide any additional information that cannot be communicated using the structured area and geometry fields."
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

export default AddServiceAreaForm;
