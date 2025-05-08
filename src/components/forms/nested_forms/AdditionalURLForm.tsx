import { Modal, Button, Form, Input, message } from 'antd';
import Url from '../../../interface/model/Url';

const AdditionalURLForm = ({
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

  const addNewURL = async () => {
    const values = await form.validateFields();
    const exists = objectData.some((existing) => existing.url === values.url);
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
      content: 'Duplicate URLs not allowed!',
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
      title="Add Additional URL"
      footer={
        <Button type="primary" onClick={addNewURL}>
          Add
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="label">
          <Input />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[
            {
              type: 'url',
              message: 'Invalid URL!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {contextHolder}
      </Form>
    </Modal>
  );
};

export default AdditionalURLForm;
