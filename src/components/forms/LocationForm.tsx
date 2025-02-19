import React, { JSX, useEffect, useState } from 'react';
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
import { Service } from '../../interface/model/Service';
import Response from '../../interface/Response';
import { getAllServices } from '../../api/lib/services';
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
  const [services, setServices] = useState<Service[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        const data = response.data as Response<Service[]>;
        data.contents?.forEach((service) => {
          setServices((prev) => [...prev, service]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  });

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
  // TODO: Add phones and Regular Schedules table
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
      <Form form={form} variant="filled" onFinish={onFinish}>
        <Form.Item
          label="Location Name"
          name="name"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Location Alternate Name" name="alternateName">
          <Input />
        </Form.Item>
        <Form.Item
          label="Location Transportation"
          name="locationTransportation"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Location Description"
          name="description"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Location Service" name="service">
          <Select
            showSearch
            placeholder="Select a Service"
            options={services.map((service) => {
              return { value: service.id, label: service.name };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select a State"
            options={stateList.map((state) => {
              return { value: state, label: state };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zip"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Location Details"
          name="details"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
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
