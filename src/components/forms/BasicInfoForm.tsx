import { Form, Input, Button, Tooltip } from 'antd';
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
import DisplayTable from './DisplayTable';
import JSONDataModal from '../JSONDataModal';

const BasicInfoForm = ({ parentForm }: { parentForm: FormInstance }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showOrganizationModal, setShowOrganizationModal] =
    useState<boolean>(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization>();
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOrganization(
      parentForm.getFieldValue('organization') ?? undefined
    );
  }, [parentForm]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await getAllOrganizations();
      const data = response.data as Response<Organization[]>;
      setOrganizations(data.contents || []);
    };
    fetchOrganizations();
  }, []);

  const URLColumns: ColumnsType = [
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
  ];

  const handleAddOrganization = (organization: Organization) => {
    setSelectedOrganization(organization);
    parentForm.setFieldsValue({ organization: organization });
  };

  const handleDeleteOrganization = () => {
    setSelectedOrganization(undefined);
    parentForm.setFieldsValue({ organization: undefined });
  };

  return (
    <div className="w-[100%] flex flex-col justify-center pt-4">
      <JSONDataModal
        showModal={showJSONModal}
        closeModal={() => setShowJSONModal(false)}
        data={selectedOrganization ?? {}}
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
                  <span
                    className="truncate hover:cursor-pointer"
                    onClick={() => setShowJSONModal(true)}
                  >
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
          <DisplayTable<Url>
            columns={URLColumns}
            deleteWidth={30}
            parentForm={parentForm}
            fieldLabel="additional_urls"
            tooltipTitle="The details of additional URLs for the service."
            formLabel="Additional URLs"
            formProps={{
              existingObjects: [],
              existingLabels: [],
              formTitle: 'Add Additional URL',
              formItems: (_, ref) => <AddURLForm ref={ref} />,
              parseFields: {},
              parseObject: {},
            }}
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
