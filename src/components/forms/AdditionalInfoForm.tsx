import { Table, Form, Input, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import ServiceCapacity from '../../interface/model/ServiceCapacity';
import AddCapacityForm from './nested_forms/AddCapacityForm';
import AddFundingForm from './nested_forms/AddFundingForm';
import Funding from '../../interface/model/Funding';
import Organization from '../../interface/model/Organization';
import AddProgramForm from './nested_forms/AddProgramForm';
import Program from '../../interface/model/Program';

const AdditionalInfoForm = ({
  form,
  organization,
}: {
  form: FormInstance;
  organization: Organization | undefined;
}) => {
  const [showCapacityModal, setShowCapacityModal] = useState<boolean>(false);
  const [showFundingModal, setShowFundingModal] = useState<boolean>(false);
  const [showProgramModal, setShowProgramModal] = useState<boolean>(false);
  const [capacityData, setCapacityData] = useState<ServiceCapacity[]>([]);
  const [fundingData, setFundingData] = useState<Funding[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program>();

  const capacitiesColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: ['unit', 'name'],
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Maximum',
      dataIndex: 'maximum',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
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

  const fundingColumns: ColumnsType = [
    {
      title: 'Source',
      dataIndex: 'source',
      width: '90%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Funding) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteFunding(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingCapacities = form.getFieldValue('capacities') || [];
    setCapacityData(existingCapacities);
    const existingFunding = form.getFieldValue('funding') || [];
    setFundingData(existingFunding);
    const existingProgram = form.getFieldValue('program');
    setSelectedProgram(existingProgram);
  }, [form]);

  const handleAddCapacity = (capacity: ServiceCapacity) => {
    const newCapacities = [...capacityData, capacity];
    setCapacityData(newCapacities);
    form.setFieldsValue({ capacities: newCapacities });
  };

  const handleDeleteCapacity = (capacityToDelete: ServiceCapacity) => {
    const updatedCapacities = capacityData.filter(
      (capacity) => capacity !== capacityToDelete
    );
    setCapacityData(updatedCapacities);
    form.setFieldsValue({ capacities: updatedCapacities });
  };

  const handleAddFunding = (funding: Funding) => {
    const newFunding = [...fundingData, funding];
    setFundingData(newFunding);
    form.setFieldsValue({ funding: newFunding });
  };

  const handleDeleteFunding = (fundingToDelete: Funding) => {
    const updatedFunding = fundingData.filter(
      (funding) => funding !== fundingToDelete
    );
    setFundingData(updatedFunding);
    form.setFieldsValue({ funding: updatedFunding });
  };

  const handleAddProgram = (program: Program) => {
    setSelectedProgram(program);
    form.setFieldsValue({ program: program });
  };

  const handleDeleteProgram = () => {
    setSelectedProgram(undefined);
    form.setFieldsValue({ program: undefined });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
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
        <AddCapacityForm
          showModal={showCapacityModal}
          closeModal={() => setShowCapacityModal(false)}
          addObject={handleAddCapacity}
          objectData={capacityData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Funding</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowFundingModal(true)}
                size="small"
              />
            </div>
          }
          name="funding"
        >
          <Table columns={fundingColumns} dataSource={fundingData} />
        </Form.Item>
        <AddFundingForm
          showModal={showFundingModal}
          closeModal={() => setShowFundingModal(false)}
          addObject={handleAddFunding}
          objectData={fundingData}
          existingFunding={organization?.funding ?? []}
        />
        <div className="flex flex-row gap-4">
          <Form.Item
            className="w-1/2"
            label={
              <div className="flex flex-row items-center gap-2">
                <span>Attributes</span>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowProgramModal(true)}
                  size="small"
                />
              </div>
            }
            name="attributes"
          >
            <Select mode="multiple" showSearch allowClear />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <div className="flex flex-row items-center gap-2">
                <span>Program</span>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowProgramModal(true)}
                  size="small"
                />
              </div>
            }
            name="program"
          >
            {selectedProgram ? (
              <div className="flex flex-row items-center gap-2">
                <div className="overflow-hidden">
                  <span className="truncate">
                    {selectedProgram.name} - {selectedProgram.description}
                  </span>
                </div>
                <Button
                  className="ml-auto"
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteProgram}
                  size="middle"
                  danger
                />
              </div>
            ) : (
              'No Program Selected'
            )}
          </Form.Item>
          <AddProgramForm
            showModal={showProgramModal}
            closeModal={() => setShowProgramModal(false)}
            addObject={handleAddProgram}
            existingPrograms={organization?.programs ?? []}
          />
        </div>
        <Form.Item
          className="w-2/3 self-center"
          label="Accreditations"
          name="accreditations"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
