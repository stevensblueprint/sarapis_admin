import { Modal, Button, Form, Input, message } from 'antd';
import Accessibility from '../../../interface/model/Accessibility';

const AddAccessibilityForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (accessibility: Accessibility) => void;
  objectData: Accessibility[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isDuplicate = (newAccessibility: Accessibility) => {
    return objectData.some(
      (existing) =>
        JSON.stringify(existing) === JSON.stringify(newAccessibility)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newAccessibility: Accessibility = {
        ...values,
      };
      console.log(newAccessibility);
      if (isDuplicate(newAccessibility)) {
        showError();
      } else {
        addObject(newAccessibility);
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
      content: 'Duplicate accessibilities not allowed!',
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
      title="Add Accessibility"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="URL"
          name="url"
          rules={[{ type: 'url', message: 'Invalid URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Details" name="details">
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccessibilityForm;
