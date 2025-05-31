import { Form, Input, Tooltip, Select } from 'antd';
import { JSX } from 'react';

const AddAddressForm = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The name of the person or entity whose attention should be sought at the location. These are often included as a “care of” component of an address."
            >
              Attention
            </Tooltip>
          }
          name="attention"
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The type of address which may be physical, postal, or virtual."
            >
              Address Type
            </Tooltip>
          }
          name="address_type"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Select
            options={[
              { label: 'Physical', value: 'physical' },
              { label: 'Postal', value: 'postal' },
              { label: 'Virtual', value: 'virtual' },
            ]}
            allowClear
          />
        </Form.Item>
      </div>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The first line(s) of the address, including office, building number and street."
            >
              Address 1
            </Tooltip>
          }
          name="address_1"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="A second (additional) line of address information."
            >
              Address 2
            </Tooltip>
          }
          name="address_2"
        >
          <Input />
        </Form.Item>
      </div>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The city in which the address is located."
            >
              City
            </Tooltip>
          }
          name="city"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="The region in which the address is located."
            >
              Region
            </Tooltip>
          }
          name="region"
        >
          <Input />
        </Form.Item>
      </div>
      <div className="flex flex-row gap-2">
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The state or province in which the address is located."
            >
              State/Province
            </Tooltip>
          }
          name="state_province"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The postal code for the address."
            >
              Postal Code
            </Tooltip>
          }
          name="postal_code"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The country in which the address is located. This should be given as an ISO 3361-1 country code (two letter abbreviation)."
            >
              Country
            </Tooltip>
          }
          name="country"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input />
        </Form.Item>
      </div>
    </>
  );
};

export default AddAddressForm;
