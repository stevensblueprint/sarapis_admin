import { Modal, Button, Form, Input, message, Select } from 'antd';
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
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="Extent Type" name="extent_type">
            <Select
              options={[
                { value: 'geojson', label: 'GeoJSON' },
                { value: 'topojson', label: 'Topological GeoJSON' },
                { value: 'kml', label: 'Keyhole Markup Language' },
                { value: 'text', label: 'Text' },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="URI"
            name="uri"
            rules={[{ type: 'url', message: 'Invalid URL!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Extent" name="extent">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceAreaForm;
