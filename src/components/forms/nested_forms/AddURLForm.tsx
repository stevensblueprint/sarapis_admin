import { Modal, Button, Form, Input, message, Tooltip } from 'antd';
import Url from '../../../interface/model/Url';

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
      </Form>
    </Modal>
  );
};

export default AddURLForm;
