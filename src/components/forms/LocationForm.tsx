import { Table, Form, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';
import { useState, useEffect } from 'react';
import ServiceArea from '../../interface/model/ServiceArea';
import { ColumnsType } from 'antd/es/table';
import AddServiceAreaForm from './nested_forms/AddServiceAreaForm';

const LocationForm = ({
  form,
  organization,
}: {
  form: FormInstance;
  organization: Organization | undefined;
}) => {
  const [showServiceAreaModal, setShowServiceAreaModal] =
    useState<boolean>(false);
  const [serviceAreaData, setServiceAreaData] = useState<ServiceArea[]>([]);

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

  useEffect(() => {
    const existingServiceAreas = form.getFieldValue('service_areas') || [];
    setServiceAreaData(existingServiceAreas);
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

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Service Areas</span>
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
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Service At Locations</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="service_at_locations"
        >
          <Table />
        </Form.Item>
      </div>
    </div>
  );
};

export default LocationForm;
