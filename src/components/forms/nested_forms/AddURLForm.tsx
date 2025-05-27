import { Modal, Button, Form, Input, message, Tooltip, Select } from 'antd';
import Url from '../../../interface/model/Url';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AddURLForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (url: Url) => void;
  objectData: Url[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newURL: Url = { ...values, url: values.url.trim() };

      const exists = objectData.some((existing) => existing.url === newURL);

      if (exists) {
        showError();
      } else {
        addObject(newURL);
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
      content: 'Duplicate URLs not allowed!',
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
      title="Add Additional URL"
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
              title="The human-readable label for this url e.g. “Twitter” or “Website”."
            >
              Name
            </Tooltip>
          }
          name="label"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The URL for this URL object. This must be formatted as a valid URI."
            >
              URL
            </Tooltip>
          }
          name="url"
          rules={[
            {
              type: 'url',
              message: 'Invalid URL!',
            },
            {
              required: true,
              message: 'URL is required!',
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

export default AddURLForm;
