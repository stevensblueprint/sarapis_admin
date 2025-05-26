import { Table, Form, Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';
import { useState, useEffect } from 'react';
import ServiceArea from '../../interface/model/ServiceArea';
import { ColumnsType } from 'antd/es/table';
import AddServiceAreaForm from './nested_forms/AddServiceAreaForm';
import AddServiceAtLocationForm from './nested_forms/AddServiceAtLocationForm';
import ServiceAtLocation from '../../interface/model/ServiceAtLocation';

const LocationForm = ({ form }: { form: FormInstance }) => {
  const [showServiceAreaModal, setShowServiceAreaModal] =
    useState<boolean>(false);
  const [serviceAreaData, setServiceAreaData] = useState<ServiceArea[]>([]);
  const [showServiceAtLocationModal, setShowServiceAtLocationModal] =
    useState<boolean>(false);
  const [serviceAtLocationData, setServiceAtLocationData] = useState<
    ServiceAtLocation[]
  >([]);
  const [organization, setOrganization] = useState<Organization | undefined>();

  const serviceAreaColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '60%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: ServiceArea) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteServiceArea(record)}
        />
      ),
    },
  ];

  const serviceAtLocationColumns: ColumnsType = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: '90%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: ServiceArea) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteServiceAtLocation(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingServiceAreas = form.getFieldValue('service_areas') || [];
    setServiceAreaData(existingServiceAreas);
    const existingServiceAtLocations =
      form.getFieldValue('service_at_locations') || [];
    setServiceAtLocationData(existingServiceAtLocations);
    const selectedOrganization =
      form.getFieldValue('organization') ?? undefined;
    setOrganization(selectedOrganization);
  }, [form]);

  const handleAddServiceArea = (serviceArea: ServiceArea) => {
    const newServiceAreas = [...serviceAreaData, serviceArea];
    setServiceAreaData(newServiceAreas);
    form.setFieldsValue({ service_areas: newServiceAreas });
  };

  const handleDeleteServiceArea = (serviceAreaToDelete: ServiceArea) => {
    const updatedServiceAreas = serviceAreaData.filter(
      (serviceArea) => serviceArea !== serviceAreaToDelete
    );
    setServiceAreaData(updatedServiceAreas);
    form.setFieldsValue({ service_areas: updatedServiceAreas });
  };

  const handleAddServiceAtLocation = (serviceAtLocation: ServiceAtLocation) => {
    const newServiceAtLocations = [...serviceAtLocationData, serviceAtLocation];
    setServiceAtLocationData(newServiceAtLocations);
    form.setFieldsValue({ service_at_locations: newServiceAtLocations });
  };

  const handleDeleteServiceAtLocation = (
    serviceAtLocationToDelete: ServiceAtLocation
  ) => {
    const updatedServiceAtLocations = serviceAtLocationData.filter(
      (serviceAtLocation) => serviceAtLocation !== serviceAtLocationToDelete
    );
    setServiceAtLocationData(updatedServiceAtLocations);
    form.setFieldsValue({ service_at_locations: updatedServiceAtLocations });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The details of the geographic area for which a service is available."
              >
                Service Areas
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowServiceAreaModal(true)}
                size="small"
              />
            </div>
          }
          name="service_areas"
        >
          <Table columns={serviceAreaColumns} dataSource={serviceAreaData} />
        </Form.Item>
        <AddServiceAreaForm
          showModal={showServiceAreaModal}
          closeModal={() => setShowServiceAreaModal(false)}
          addObject={handleAddServiceArea}
          objectData={serviceAreaData}
          existingServiceAreas={[]}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="A link between a service and a specific location."
              >
                Service At Locations
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowServiceAtLocationModal(true)}
                size="small"
              />
            </div>
          }
          name="service_at_locations"
        >
          <Table
            columns={serviceAtLocationColumns}
            dataSource={serviceAtLocationData}
          />
        </Form.Item>
        <AddServiceAtLocationForm
          showModal={showServiceAtLocationModal}
          closeModal={() => setShowServiceAtLocationModal(false)}
          addObject={handleAddServiceAtLocation}
          objectData={serviceAtLocationData}
          existingData={[
            [...(form.getFieldValue('service_areas') ?? [])],
            [
              ...(organization?.contacts ?? []),
              ...(form.getFieldValue('contacts') ?? []),
            ],
            [
              ...(organization?.phones ?? []),
              ...(form.getFieldValue('phones') ?? []),
            ],
            [...(form.getFieldValue('schedules') ?? [])],
            [...(organization?.locations ?? [])],
          ]}
        />
      </div>
    </div>
  );
};

export default LocationForm;
