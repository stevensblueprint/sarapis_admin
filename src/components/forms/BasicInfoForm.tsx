import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../api/lib/organizations';
import Organization from '../../interface/model/Organization';
import Response from '../../interface/Response';

const BasicInfoForm = () => {
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
    <div className="flex flex-row justify-center gap-4">
      <div className="w-1/3">
        <Form.Item
          label="Service Name"
          name="name"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Alternate Service Name" name="alternate_name">
          <Input />
        </Form.Item>
        <Form.Item label="Organization" name="organization">
          <Select
            showSearch
            placeholder="Select an Organization"
            options={organizations.map((organization) => {
              return { value: organization.id, label: organization.name };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Service Email"
          name="email"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="w-1/3">
        <Form.Item
          label="Service URL (website)"
          name="url"
          rules={[
            {
              type: 'url',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Additional Service URLs" name="additional_urls">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="Service Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default BasicInfoForm;
