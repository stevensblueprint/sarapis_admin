import { Form, Input, Select, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../api/lib/organizations';
import Organization from '../../interface/model/Organization';
import Response from '../../interface/Response';
import Url from '../../interface/model/Url';
import AdditionalURLForm from './nested_forms/AdditionalURLForm';
import type { FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const BasicInfoForm = ({ form }: { form: FormInstance }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showURLModal, setShowURLModal] = useState<boolean>(false);
  const [URLData, setURLData] = useState<Url[]>([]);

  useEffect(() => {
    const existingURLs = form.getFieldValue('additional_urls') || [];
    setURLData(existingURLs);
  }, [form]);

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

  const columns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'label',
      width: 50,
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      width: 100,
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: 30,
      align: 'center',
      render: (record: Url) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteURL(record)}
        />
      ),
    },
  ];

  const handleAddURL = (url: Url) => {
    const newURLs = [...URLData, url];
    setURLData(newURLs);
    form.setFieldsValue({ additional_urls: newURLs });
  };

  const handleDeleteURL = (urlToDelete: Url) => {
    const updatedURLs = URLData.filter((url) => url.url !== urlToDelete.url);
    setURLData(updatedURLs);
    form.setFieldsValue({ additional_urls: updatedURLs });
  };

  return (
    <div className="w-[100%] flex flex-col justify-center pt-4">
      <div className="flex flex-row justify-center gap-4">
        <div className="w-1/3 flex flex-col">
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
          <Form.Item
            label={
              <div className="flex flex-row items-center gap-2 pt-2">
                <span>Additional URLs</span>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowURLModal(true)}
                  size="small"
                />
              </div>
            }
            name="additional_urls"
          >
            <Table columns={columns} dataSource={URLData} />
          </Form.Item>
          <AdditionalURLForm
            showModal={showURLModal}
            closeModal={() => setShowURLModal(false)}
            addObject={handleAddURL}
            objectData={URLData}
          />
        </div>
      </div>
      <Form.Item
        className="w-1/2 self-center"
        label="Service Description"
        name="description"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </div>
  );
};

export default BasicInfoForm;
