import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../api/lib/organizations';
import Organization from '../../interface/model/Organization';
import Response from '../../interface/Response';

const BasicForm = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllOrganizations();
        const data = response.data as Response<Organization[]>;
        setOrganizations(data.contents || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <div className="self-center md:w-1/2 lg:w-2/5">
      <Form.Item
        label="Service Name"
        name="Service Name"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Organization Name"
        name="Organization Name"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Select
          showSearch
          placeholder="Select an Organization"
          options={organizations.map((organization) => {
            return { value: organization.id, label: organization.name };
          })}
        />
      </Form.Item>
      <Form.Item
        label="Service Description"
        name="Service Description"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Service URL (website)"
        name="Service URL"
        rules={[
          { required: true },
          { type: 'url', warningOnly: true },
          { type: 'string', min: 6 },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Service Email"
        name="Service Email"
        rules={[
          { required: true },
          { type: 'email', warningOnly: true },
          { type: 'string', min: 6 },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Service Area"
        name="Service Area"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Select />
      </Form.Item>
      <Form.Item
        label="Service Alternate Name"
        name="Service Alternate Name"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Accreditations"
        name="Accreditations"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Funding"
        name="Funding"
        rules={[{ required: true, message: 'Required field!' }]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default BasicForm;
