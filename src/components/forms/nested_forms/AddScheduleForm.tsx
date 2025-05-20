import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  DatePicker,
} from 'antd';
import Schedule from '../../../interface/model/Schedule';

const AddScheduleForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (schedule: Schedule) => void;
  objectData: Schedule[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isDuplicate = (newSchedule: Schedule) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newSchedule)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newSchedule: Schedule = {
        ...values,
      };

      if (isDuplicate(newSchedule)) {
        showError();
      } else {
        addObject(newSchedule);
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
      content: 'Duplicate schedules not allowed!',
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
      title="Add Schedule"
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

export default AddScheduleForm;
