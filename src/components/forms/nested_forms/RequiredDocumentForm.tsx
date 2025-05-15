import { Modal, Button, Form, Input, message } from 'antd';
import RequiredDocument from '../../../interface/model/RequiredDocument';

const RequiredDocumentForm = ({
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

  const isDuplicate = (newDocument: RequiredDocument) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newDocument)
    );
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
        <Form.Item label="Document" name="document">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="URI"
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
      </Form>
    </Modal>
  );
};

export default RequiredDocumentForm;
