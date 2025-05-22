import { Modal, Button, Form, Input, message, Select } from 'antd';
import Address from '../../../interface/model/Address';

const AddAddressForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (address: Address) => void;
  objectData: Address[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isDuplicate = (newAddress: Address) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newAddress)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newAddress: Address = {
        ...values,
      };
      console.log(newAddress);
      if (isDuplicate(newAddress)) {
        showError();
      } else {
        addObject(newAddress);
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
      content: 'Duplicate addresses not allowed!',
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
      title="Add Address"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="flex flex-row gap-2">
          <Form.Item label="Attention" name="attention">
            <Input />
          </Form.Item>
          <Form.Item
            label="Address Type"
            name="address_type"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Select
              options={[
                { label: 'Physical', value: 'physical' },
                { label: 'Postal', value: 'postal' },
                { label: 'Virtual', value: 'virtual' },
              ]}
              allowClear
            />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            label="Address 1"
            name="address_1"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Address 2" name="address_2">
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Region" name="region">
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            label="State/Province"
            name="state_province"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            name="postal_code"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAddressForm;
