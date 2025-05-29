import { Form, Input, Table, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../api/lib/organizations';
import Organization from '../../interface/model/Organization';
import Response from '../../interface/Response';
import Url from '../../interface/model/Url';
import AddURLForm from './nested_forms/AddURLForm';
import type { FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import AddOrganizationToServiceForm from './nested_forms/AddOrganizationToServiceForm';
import JSONDataModal from '../JSONDataModal';
import NestedForm from './NestedForm';

const BasicInfoForm = ({ form }: { form: FormInstance }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showURLModal, setShowURLModal] = useState<boolean>(false);
  const [showOrganizationModal, setShowOrganizationModal] =
    useState<boolean>(false);
  const [URLData, setURLData] = useState<Url[]>([]);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization>();
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);
  const [JSONData, setJSONData] = useState<object>();

  useEffect(() => {
    const existingURLs = form.getFieldValue('additional_urls') || [];
    setURLData(existingURLs);
    const existingOrganization: Organization =
      form.getFieldValue('organization') ?? undefined;
    setSelectedOrganization(existingOrganization);
  }, [form]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await getAllOrganizations();
      const data = response.data as Response<Organization[]>;
      setOrganizations(data.contents || []);
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
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteURL(record);
          }}
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
    const updatedURLs = URLData.filter((url) => url !== urlToDelete);
    setURLData(updatedURLs);
    form.setFieldsValue({ additional_urls: updatedURLs });
  };

  const handleAddOrganization = (organization: Organization) => {
    setSelectedOrganization(organization);
    form.setFieldsValue({ organization: organization });
  };

  const handleDeleteOrganization = () => {
    setSelectedOrganization(undefined);
    form.setFieldsValue({ organization: undefined });
  };

  return (
    <div className="w-[100%] flex flex-col justify-center pt-4">
      <JSONDataModal
        showModal={showJSONModal}
        closeModal={() => setShowJSONModal(false)}
        data={JSONData ?? {}}
      />
      <div className="flex flex-row justify-center gap-4">
        <div className="w-1/3 flex flex-col">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The official or public name of the service."
              >
                Service Name
              </Tooltip>
            }
            name="name"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="An (optional) alternative name for this service."
              >
                Alternate Service Name
              </Tooltip>
            }
            name="alternate_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="flex flex-row items-center gap-2">
                <Tooltip
                  placement="topLeft"
                  title="The details about each organization delivering services. Each service should be linked to the organization responsible for its delivery. One organization may deliver many services."
                >
                  Organization
                </Tooltip>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowOrganizationModal(true)}
                  size="small"
                />
              </div>
            }
            name="organization"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            {selectedOrganization ? (
              <div className="flex flex-row items-center gap-2">
                <div className="overflow-hidden">
                  <span className="truncate">
                    {selectedOrganization.name} -{' '}
                    {selectedOrganization.description}
                  </span>
                </div>
                <Button
                  className="ml-auto"
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteOrganization}
                  size="middle"
                  danger
                />
              </div>
            ) : (
              'No Organization Selected'
            )}
          </Form.Item>
          <AddOrganizationToServiceForm
            showModal={showOrganizationModal}
            closeModal={() => setShowOrganizationModal(false)}
            addObject={handleAddOrganization}
            existingOrganizations={organizations ?? []}
          />
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="An email address which can be used to contact the service provider."
              >
                Service Email
              </Tooltip>
            }
            name="email"
            rules={[{ type: 'email', message: 'Invalid Email!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="w-1/3">
          <Form.Item
            label={
              <Tooltip placement="topLeft" title="URL of the service.">
                Service URL (Website)
              </Tooltip>
            }
            name="url"
            rules={[
              {
                type: 'url',
                message: 'Invalid URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="flex flex-row items-center gap-2 pt-2">
                <Tooltip
                  placement="topLeft"
                  title="The details of additional URLs for the service"
                >
                  Additional URLs
                </Tooltip>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowURLModal(true)}
                  size="small"
                />
              </div>
            }
            name="additional_urls"
          >
            <Table
              columns={columns}
              dataSource={URLData}
              onRow={(record) => ({
                onClick: () => {
                  setJSONData(record);
                  setShowJSONModal(true);
                },
                className: 'hover:cursor-pointer',
              })}
            />
          </Form.Item>
          <NestedForm<Url>
            showModal={showURLModal}
            closeModal={() => setShowURLModal(false)}
            addObject={handleAddURL}
            objectData={URLData}
            existingObjects={[]}
            existingLabels={['label', 'url']}
            formItems={(form, ref) => (
              <AddURLForm parentForm={form} ref={ref} />
            )}
            formTitle="Add Additional URL"
            parseFields={{}}
          />
        </div>
      </div>
      <Form.Item
        className="w-1/2 self-center"
        label={
          <Tooltip
            placement="topLeft"
            title="A free text description of the service."
          >
            Service Description
          </Tooltip>
        }
        name="description"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </div>
  );
};

export default BasicInfoForm;
