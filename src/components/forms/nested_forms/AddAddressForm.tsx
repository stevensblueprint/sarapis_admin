import { Modal, Button, Form, Input, message, Select, Tooltip } from 'antd';
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
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The name of the person or entity whose attention should be sought at the location. These are often included as a “care of” component of an address."
              >
                Attention
              </Tooltip>
            }
            name="attention"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The type of address which may be physical, postal, or virtual."
              >
                Address Type
              </Tooltip>
            }
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
            label={
              <Tooltip
                placement="topLeft"
                title="The first line(s) of the address, including office, building number and street."
              >
                Address 1
              </Tooltip>
            }
            name="address_1"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A second (additional) line of address information."
              >
                Address 2
              </Tooltip>
            }
            name="address_2"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The city in which the address is located."
              >
                City
              </Tooltip>
            }
            name="city"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The region in which the address is located."
              >
                Region
              </Tooltip>
            }
            name="region"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The state or province in which the address is located."
              >
                State/Province
              </Tooltip>
            }
            name="state_province"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The postal code for the address."
              >
                Postal Code
              </Tooltip>
            }
            name="postal_code"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The country in which the address is located. This should be given as an ISO 3361-1 country code (two letter abbreviation)."
              >
                Country
              </Tooltip>
            }
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
