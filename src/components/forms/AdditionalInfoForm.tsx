import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../api/lib/organizations';
import Organization from '../../interface/model/Organization';
import Response from '../../interface/Response';

const AdditionalInfoForm = () => {
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
          label="test"
          name="test"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Alternate Service Name" name="test4">
          <Input />
        </Form.Item>
        <Form.Item
          label="Organization"
          name="test2"
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
          label="Service Email"
          name="test3"
          rules={[
            { required: true, message: 'Required field!' },
            { type: 'email', warningOnly: true },
            { type: 'string' },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="w-1/3">
        <Form.Item
          label="Service URL (website)"
          name="test5"
          rules={[
            {
              required: true,
              message: 'Required field!',
            },
            {
              type: 'url',
              warningOnly: true,
            },
            { type: 'string' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Additional Service URLs" name="test6">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item
          label="Service Description"
          name="test7"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
