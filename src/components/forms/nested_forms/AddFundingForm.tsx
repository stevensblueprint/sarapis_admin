import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Select,
  Divider,
  Tooltip,
} from 'antd';
import Funding from '../../../interface/model/Funding';
import { useState } from 'react';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';

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
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<Funding | null>(null);

  const isDuplicate = (newFunding: Funding) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newFunding)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const handleSelect = (jsonValue: string) => {
    const funding = JSON.parse(jsonValue) as Funding;
    form.setFieldsValue(funding);
    setSelectedFunding(funding);
  };

  const addNewObject = async () => {
    const values = await form.validateFields();
    const newFunding: Funding = { ...values, source: values.source.trim() };
    if (isDuplicate(newFunding)) {
      showError();
      return;
    }
    addObject(newFunding);
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
          showSearch
          placeholder="Select a Funding Source"
          options={Array.from(
            new Set(existingFunding.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Funding)
            .map((funding) => ({
              value: JSON.stringify(funding),
              label: funding.source,
            }))}
          onSelect={handleSelect}
          value={selectedFunding ? JSON.stringify(selectedFunding) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Funding Source</strong>
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of the source of funds for this organization or service."
            >
              Source
            </Tooltip>
          }
          name="source"
          rules={[{ required: true, message: 'Required Field!' }]}
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

export default AddFundingForm;
