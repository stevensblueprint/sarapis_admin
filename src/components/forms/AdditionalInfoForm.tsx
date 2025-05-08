import { Table, Form, Input, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import ServiceCapacity from '../../interface/model/ServiceCapacity';
import CapacitiesForm from './nested_forms/CapacitiesForm';

const AdditionalInfoForm = ({ form }: { form: FormInstance }) => {
  const [showCapacityModal, setShowCapacityModal] = useState<boolean>(false);
  const [capacityData, setCapacityData] = useState<ServiceCapacity[]>([]);

  const capacitiesColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: ['unit', 'name'],
      width: 75,
      ellipsis: true,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: 75,
      ellipsis: true,
    },
    {
      title: 'Maximum',
      dataIndex: 'maximum',
      width: 75,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: 30,
      align: 'center',
      render: (record: ServiceCapacity) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteCapacity(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingCapacities = form.getFieldValue('capacities') || [];
    setCapacityData(existingCapacities);
  }, [form]);

  const handleAddCapacity = (capacity: ServiceCapacity) => {
    const newCapacities = [...capacityData, capacity];
    setCapacityData(newCapacities);
    form.setFieldsValue({ additional_urls: newCapacities });
  };

  const handleDeleteCapacity = (capacityToDelete: ServiceCapacity) => {
    const updatedCapacities = capacityData.filter(
      (capacity) => capacity !== capacityToDelete
    );
    setCapacityData(updatedCapacities);
    form.setFieldsValue({ additional_urls: updatedCapacities });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Capacities</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowCapacityModal(true)}
                size="small"
              />
            </div>
          }
          name="capacities"
        >
          <Table columns={capacitiesColumns} dataSource={capacityData} />
        </Form.Item>
        <CapacitiesForm
          showModal={showCapacityModal}
          closeModal={() => setShowCapacityModal(false)}
          addObject={handleAddCapacity}
          objectData={capacityData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Funding</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="funding"
        >
          <Table />
        </Form.Item>
        <div className="flex flex-row gap-4">
          <Form.Item
            className="w-1/2 self-center"
            label="Accreditations"
            name="accreditations"
          >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item className="w-1/2" label="Program" name="program">
            <Input />
          </Form.Item>
        </div>
        <Form.Item className="w-[100%]" label="Attributes" name="attributes">
          <Select />
        </Form.Item>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
