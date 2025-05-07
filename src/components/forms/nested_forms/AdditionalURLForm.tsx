import { Modal, Button, Form, Input, message } from 'antd';
import Url from '../../../interface/model/Url';

const AdditionalURLForm = ({
  showURLModal,
  closeURLModal,
  addURL,
  URLData,
}: {
  showURLModal: boolean;
  closeURLModal: () => void;
  addURL: (url: Url) => void;
  URLData: Url[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const addNewURL = async () => {
    const values = await form.validateFields();
    const exists = URLData.some((existing) => existing.url === values.url);
    if (exists) {
      showError();
    } else {
      addURL(values);
      closeURLModal();
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
      open={showURLModal}
      onCancel={() => {
        closeURLModal();
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
