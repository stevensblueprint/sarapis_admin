import { Modal, Button, Form, Input, message, Tooltip } from 'antd';
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
          label={
            <Tooltip
              placement="topLeft"
              title="The URL of a page giving more information about the accessibility of the location."
            >
              URL
            </Tooltip>
          }
          name="url"
          rules={[{ type: 'url', message: 'Invalid URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of the assistance or infrastructure that facilitates access to clients with disabilities."
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
            <Tooltip
              placement="topLeft"
              title="Any further details relating to the relevant accessibility arrangements at this location."
            >
              Details
            </Tooltip>
          }
          name="details"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccessibilityForm;
