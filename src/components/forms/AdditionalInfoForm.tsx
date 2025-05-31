import { Form, Input, Button, Select, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fundingColumns, capacitiesColumns } from '../../data/FormTableColumns';
import { useState, useEffect } from 'react';
import AddCapacityForm from './nested_forms/AddCapacityForm';
import AddFundingForm from './nested_forms/AddFundingForm';
import Organization from '../../interface/model/Organization';
import AddProgramForm from './nested_forms/AddProgramForm';
import Program from '../../interface/model/Program';
import AddAttributeForm from './nested_forms/AddAttributeForm';
import Attribute from '../../interface/model/Attribute';
import DisplayTable from './DisplayTable';
import ServiceCapacity from '../../interface/model/ServiceCapacity';
import { Dayjs } from 'dayjs';
import Funding from '../../interface/model/Funding';
import JSONDataModal from '../JSONDataModal';
import { fundingExistingLabels } from '../../data/FormExistingLabels';

const AdditionalInfoForm = ({ parentForm }: { parentForm: FormInstance }) => {
  const [showProgramModal, setShowProgramModal] = useState<boolean>(false);
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<Program>();
  const [organization, setOrganization] = useState<Organization | undefined>();
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedProgram(parentForm.getFieldValue('program') ?? undefined);
    setOrganization(parentForm.getFieldValue('organization') ?? undefined);
    setAttributeData(parentForm.getFieldValue('attributes') ?? []);
  }, [parentForm]);

  const handleAddProgram = (program: Program) => {
    setSelectedProgram(program);
    parentForm.setFieldsValue({ program: program });
  };

  const handleDeleteProgram = () => {
    setSelectedProgram(undefined);
    parentForm.setFieldsValue({ program: undefined });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <JSONDataModal
        showModal={showJSONModal}
        closeModal={() => setShowJSONModal(false)}
        data={selectedProgram ?? {}}
      />
      <div className="flex flex-col w-3/4">
        <DisplayTable<ServiceCapacity>
          columns={capacitiesColumns}
          parentForm={parentForm}
          fieldLabel="capacities"
          tooltipTitle="The details of capacities of this service."
          formLabel="Service Capacities"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Service Capacity',
            formItems: () => <AddCapacityForm />,
            parseFields: {
              updated: {
                parser: (value: Dayjs) =>
                  value.format('YYYY-MM-DD[T]HH:mm:ss:SSS') ?? undefined,
              },
            },
            parseObject: {},
          }}
        />
        <DisplayTable<Funding>
          columns={fundingColumns}
          parentForm={parentForm}
          fieldLabel="funding"
          tooltipTitle="The sources of funding for a service or organization."
          formLabel="Funding Sources"
          formProps={{
            existingObjects: organization?.funding ?? [],
            existingLabels: fundingExistingLabels,
            formTitle: 'Add Funding Source',
            formItems: () => <AddFundingForm />,
            parseFields: {},
            parseObject: {},
          }}
        />
        <div className="flex flex-row gap-4">
          <Form.Item
            className="w-1/2"
            label={
              <div className="flex flex-row items-center gap-2">
                <Tooltip
                  placement="topLeft"
                  title="A link between a service and one or more classifications that describe the nature of the service provided."
                >
                  Attributes
                </Tooltip>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowAttributeModal(true)}
                  size="small"
                />
              </div>
            }
            name="attributes"
          >
            <Select mode="multiple" allowClear />
          </Form.Item>
          <AddAttributeForm
            parentForm={parentForm}
            showModal={showAttributeModal}
            closeModal={() => setShowAttributeModal(false)}
            objectData={attributeData}
            addObject={(attributes: Attribute[]) =>
              setAttributeData(attributes)
            }
          />
          <Form.Item
            className="w-1/2"
            label={
              <div className="flex flex-row items-center gap-2">
                <Tooltip
                  placement="topLeft"
                  title="The details of collections of related services."
                >
                  Program
                </Tooltip>
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
                  <span
                    className="truncate hover:cursor-pointer"
                    onClick={() => setShowJSONModal(true)}
                  >
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
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of any accreditations. Accreditation is the formal evaluation of an organization or program against best practice standards set by an accrediting organization."
            >
              Accreditations
            </Tooltip>
          }
          name="accreditations"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
