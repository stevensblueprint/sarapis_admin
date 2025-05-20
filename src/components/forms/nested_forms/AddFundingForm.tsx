import { Modal, Button, Form, Input, message, Select, Divider } from 'antd';
import Funding from '../../../interface/model/Funding';
import { useState } from 'react';

const AddFundingForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingFunding,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (funding: Funding) => void;
  objectData: Funding[];
  existingFunding: Funding[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFunding, setSelectedFunding] = useState<Funding | null>(null);

  const isDuplicate = (newFunding: Funding) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newFunding)
    );
  };

  const handleSelect = (jsonValue: string) => {
    const funding = JSON.parse(jsonValue) as Funding;
    setSelectedFunding(funding);
  };

  const handleClear = () => {
    setSelectedFunding(null);
  };

  const addNewObject = async () => {
    if (selectedFunding) {
      if (isDuplicate(selectedFunding)) {
        showError();
        return;
      }
      addObject(selectedFunding);
    } else {
      const values = await form.validateFields();
      const newFunding: Funding = { ...values, source: values.source.trim() };
      if (isDuplicate(newFunding)) {
        showError();
        return;
      }
      addObject(newFunding);
    }

    closeModal();
    form.resetFields();
    setSelectedFunding(null);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate funding sources not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setSelectedFunding(null);
      }}
      title="Add Funding Source"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Funding Source</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Funding Source"
          options={existingFunding.map((funding) => ({
            value: JSON.stringify(funding),
            label: funding.source,
          }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={selectedFunding ? JSON.stringify(selectedFunding) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Funding Source</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedFunding !== null}
      >
        <Form.Item
          label="Source"
          name="source"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFundingForm;
