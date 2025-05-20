import { Modal, Button, Form, Input, Select, Divider } from 'antd';
import { useState } from 'react';
import Program from '../../../interface/model/Program';

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

  const addNewObject = async () => {
    if (selectedProgram) {
      addObject(selectedProgram);
    } else {
      const values = await form.validateFields();
      const trimmed: Program = { ...values };
      addObject(trimmed);
    }
    form.resetFields();
    setSelectedProgram(null);
    closeModal();
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
          options={existingPrograms.map((program) => ({
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="Alternate Name"
            name="alternate_name"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProgramForm;
