import { Modal, Button, Form, Input, message } from 'antd';
import ServiceArea from '../../../interface/model/ServiceArea';

const AddServiceAreaForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (ServiceArea: ServiceArea) => void;
  objectData: ServiceArea[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isDuplicate = (newServiceArea: ServiceArea) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newServiceArea)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newServiceArea: ServiceArea = {
        ...values,
      };

      if (isDuplicate(newServiceArea)) {
        showError();
      } else {
        addObject(newServiceArea);
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
      content: 'Duplicate service areas not allowed!',
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
      title="Add Service Area"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}></Form>
    </Modal>
  );
};

export default AddServiceAreaForm;
