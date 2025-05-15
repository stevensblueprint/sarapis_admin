import { Modal, Button, Form, Input, message } from 'antd';
import Language from '../../../interface/model/Language';

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

  const isDuplicate = (newLanguage: Language) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newLanguage)
    );
  };

  const addNewObject = async () => {
    try {
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
    } catch (error) {
      console.error('Form validation failed:', error);
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
      <Form form={form} layout="vertical" requiredMark={false}></Form>
    </Modal>
  );
};

export default AddLanguageForm;
