import { Modal, Button, Form, Input, message, Tooltip, Select } from 'antd';
import RequiredDocument from '../../../interface/model/RequiredDocument';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AddRequiredDocumentForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (document: RequiredDocument) => void;
  objectData: RequiredDocument[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newDocument: RequiredDocument) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newDocument)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newDocument: RequiredDocument = {
        ...values,
      };

      if (isDuplicate(newDocument)) {
        showError();
      } else {
        addObject(newDocument);
        closeModal();
        form.resetFields();
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate required documents not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      title="Add Required Document"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of the document required to apply for or receive the service."
            >
              Document
            </Tooltip>
          }
          name="document"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip placement="topLeft" title="A web link to the document.">
              URI
            </Tooltip>
          }
          name="uri"
          rules={[
            {
              type: 'url',
              message: 'Invalid URL!',
            },
          ]}
        >
          <Input />
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

export default AddRequiredDocumentForm;
