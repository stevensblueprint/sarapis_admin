import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  Tooltip,
  Select,
  DatePicker,
} from 'antd';
import CostOption from '../../../interface/model/CostOption';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

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
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newCostOption: CostOption) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newCostOption)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
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
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The dates when the price is valid."
            >
              Valid Dates
            </Tooltip>
          }
          name="valid_dates"
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-full"
            label={
              <Tooltip
                placement="topLeft"
                title="The 3 letter currency code of this cost option (expected to be gbp by Open Referral UK)."
              >
                Currency
              </Tooltip>
            }
            name="currency"
          >
            <Input placeholder="gbp, usd, etc" />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="The cost of the option, expressed as an amount."
              >
                Amount
              </Tooltip>
            }
            name="amount"
          >
            <InputNumber />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="Conditions associated with the cost option."
              >
                Option
              </Tooltip>
            }
            name="option"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="Specific details qualifying the cost amount."
              >
                Description
              </Tooltip>
            }
            name="amount_description"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2">
              <Tooltip
                placement="topLeft"
                title="A link between a service and one or more classifications that describe the nature of the service provided."
              >
                Attributes
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowAttributeModal(true)}
                size="small"
              />
            </div>
          }
          name="attributes"
        >
          <Select mode="multiple" allowClear />
        </Form.Item>
        <AddAttributeForm
          showModal={showAttributeModal}
          closeModal={() => setShowAttributeModal(false)}
          addObject={handleAddAttribute}
          objectData={attributeData}
        />
      </Form>
    </Modal>
  );
};

export default AddCostOptionForm;
