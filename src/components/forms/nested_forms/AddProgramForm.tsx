import { Modal, Button, Form, Input, Select, Divider, Tooltip } from 'antd';
import { useState } from 'react';
import Program from '../../../interface/model/Program';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';

const AddProgramForm = ({
  showModal,
  closeModal,
  addObject,
  existingPrograms,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (program: Program) => void;
  existingPrograms: Program[];
}) => {
  const [form] = Form.useForm();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const addNewObject = async () => {
    if (selectedProgram) {
      addObject(selectedProgram);
    } else {
      const values = await form.validateFields();
      const newProgram: Program = { ...values };
      addObject(newProgram);
    }
    closeModal();
    setSelectedProgram(null);
    form.resetFields();
  };

  const handleSelect = (jsonValue: string) => {
    const program = JSON.parse(jsonValue) as Program;
    setSelectedProgram(program);
  };

  const handleClear = () => {
    setSelectedProgram(null);
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        setSelectedProgram(null);
        form.resetFields();
      }}
      title="Add Program"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Program</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Program"
          options={Array.from(
            new Set(existingPrograms.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Program)
            .map((program) => ({
              value: JSON.stringify(program),
              label: `${program.name} - ${program.description}`,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={selectedProgram ? JSON.stringify(selectedProgram) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Program</strong>
      </div>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedProgram !== null}
      >
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip placement="topLeft" title="The name of the program.">
                Name
              </Tooltip>
            }
            name="name"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="The (optional) alternative name for the program."
              >
                Alternate Name
              </Tooltip>
            }
            name="alternate_name"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of the program."
            >
              Description
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
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
          showModal={showAttributeModal}
          closeModal={() => setShowAttributeModal(false)}
          addObject={handleAddAttribute}
          objectData={attributeData}
        />
      </Form>
    </Modal>
  );
};

export default AddProgramForm;
