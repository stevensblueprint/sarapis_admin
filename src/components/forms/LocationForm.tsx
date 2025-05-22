import React, { JSX, useState } from 'react';
import {
  Alert,
  Button,
  Form,
  FormInstance,
  FormProps,
  Input,
  Select,
  Space,
  InputNumber,
} from 'antd';
import { LocationError, createLocation } from '../../api/lib/locations';
import Location from '../../interface/model/Location';
import { stateList } from '../../data/Common';

interface LocationFormProps {
  parentForm: FormInstance;
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

const LocationForm = ({
  parentForm,
  setLocations,
}: LocationFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm<Location>();

  const onFinish: FormProps<Location>['onFinish'] = async (values) => {
    try {
      console.log(values);
      const response = await createLocation(values);
      console.log(response);
      parentForm.setFieldValue('locations', response.data);
      setLocations((prev) => [...prev, response.data]);
      form.resetFields();
    } catch (error) {
      if (error instanceof LocationError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred while creating the location');
      }
    }
  };

  return (
    <div>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage('')}
          className="my-5"
        />
      )}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Location Name"
          name="name"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Alternate Name" name="alternateName">
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="URL" name="url">
          <Input />
        </Form.Item>
        <Form.Item
          label="Location Type"
          name="locationType"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            placeholder="Select Location Type"
            options={[
              { label: 'Virtual', value: 'virtual' },
              { label: 'Physical', value: 'physical' },
              { label: 'Postal', value: 'postal' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Transportation"
          name="transportation"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="External Identifier" name="externalIdentifier">
          <Input />
        </Form.Item>
        <Form.Item
          label="External Identifier Type"
          name="externalIdentifierType"
        >
          <Input />
        </Form.Item>
        <Form.List name="addresses">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'address']}
                    fieldKey={[field.key, 'address']}
                    rules={[{ required: true, message: 'Missing address' }]}
                  >
                    <Input placeholder="Address" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'city']}
                    fieldKey={[field.key, 'city']}
                    rules={[{ required: true, message: 'Missing city' }]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'state']}
                    fieldKey={[field.key, 'state']}
                    rules={[{ required: true, message: 'Missing state' }]}
                  >
                    <Select
                      placeholder="Select State"
                      options={stateList.map((state) => ({
                        value: state,
                        label: state,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'zip']}
                    fieldKey={[field.key, 'zip']}
                    rules={[{ required: true, message: 'Missing zip code' }]}
                  >
                    <InputNumber placeholder="Zip Code" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Address
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LocationForm;
