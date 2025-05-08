import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  DatePicker,
} from 'antd';
import ServiceCapacity from '../../../interface/model/ServiceCapacity';
const CapacitiesForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (capacity: ServiceCapacity) => void;
  objectData: ServiceCapacity[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const addNewCapacity = async () => {
    const values = await form.validateFields();
    const exists = objectData.some((existing) => existing === values);
    if (exists) {
      showError();
    } else {
      addObject(values);
      closeModal();
      form.resetFields();
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate capacities not allowed!',
      duration: 10,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      title="Add Capacity"
      footer={
        <Button type="primary" onClick={addNewCapacity}>
          Add
        </Button>
      }
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2">
            <Form.Item
              label="Name"
              name={['unit', 'name']}
              rules={[{ required: true, message: 'Required field!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Identifier" name={['unit', 'identifier']}>
              <Input />
            </Form.Item>
            <div className="flex flex-row gap-4">
              <Form.Item
                label="Available"
                name="available"
                rules={[{ required: true, message: 'Required field!' }]}
              >
                <InputNumber className="w-auto" />
              </Form.Item>
              <Form.Item label="Maximum" name="maximum">
                <InputNumber className="w-auto" />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <Form.Item label="Scheme" name={['unit', 'scheme']}>
              <Input />
            </Form.Item>
            <Form.Item label="URI" name={['unit', 'uri']}>
              <Input />
            </Form.Item>
            <Form.Item label="Last Updated" name="updated">
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
        {contextHolder}
      </Form>
    </Modal>
  );
};

export default CapacitiesForm;
