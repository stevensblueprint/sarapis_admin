import { Modal, Button, Form, Input, message, InputNumber } from 'antd';
import CostOption from '../../../interface/model/CostOption';
import { DatePicker } from 'antd';

const AddCostOptionForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (costOption: CostOption) => void;
  objectData: CostOption[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isDuplicate = (newCostOption: CostOption) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newCostOption)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newCostOption: CostOption = {
        amount: values.amount,
        amount_description: values.amount_description,
        currency: values.currency,
        option: values.option,
        valid_from: values.valid_dates?.[0]?.format('YYYY-MM-DD') ?? undefined,
        valid_to: values.valid_dates?.[1]?.format('YYYY-MM-DD') ?? undefined,
      };

      if (isDuplicate(newCostOption)) {
        showError();
      } else {
        addObject(newCostOption);
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
      content: 'Duplicate cost options not allowed!',
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
      title="Add Cost Option"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item label="Valid dates" name="valid_dates">
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-full" label="Currency" name="currency">
            <Input placeholder="gbp, usd, etc" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <InputNumber />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="Option" name="option">
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="Description"
            name="amount_description"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCostOptionForm;
