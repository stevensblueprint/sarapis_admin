import { Modal, Button, Form, Input, message, Tooltip, Select } from 'antd';
import Language from '../../../interface/model/Language';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AddLanguageForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (language: Language) => void;
  objectData: Language[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newLanguage: Language) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newLanguage)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const addNewObject = async () => {
    const values = await form.validateFields();
    const newLanguage: Language = {
      ...values,
    };

    if (isDuplicate(newLanguage)) {
      showError();
    } else {
      addObject(newLanguage);
      closeModal();
      form.resetFields();
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate languages not allowed!',
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
      title="Add Language"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-2/3"
            label={
              <Tooltip
                placement="topLeft"
                title="The name of the language in which the service is delivered."
              >
                Name
              </Tooltip>
            }
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/3"
            label={
              <Tooltip
                placement="topLeft"
                title="The ISO 639-1 or ISO 639-3 code for the language."
              >
                Code
              </Tooltip>
            }
            name="code"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of any additional context or services provided for this language."
            >
              Note
            </Tooltip>
          }
          name="note"
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

export default AddLanguageForm;
