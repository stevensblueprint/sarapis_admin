import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  DatePicker,
  Tooltip,
  Select,
} from 'antd';
import ServiceCapacity from '../../../interface/model/ServiceCapacity';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const AddCapacityForm = ({
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
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newCapacity: ServiceCapacity) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newCapacity)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const addNewObject = async () => {
    const values = await form.validateFields();
    const newCapacity: ServiceCapacity = {
      ...values,
      updated: values.updated?.format('YYYY-MM-DD[T]HH:mm:ss:SSS') ?? undefined,
    };
    if (isDuplicate(newCapacity)) {
      showError();
    } else {
      addObject(newCapacity);
      closeModal();
      form.resetFields();
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate capacities not allowed!',
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
      title="Add Capacity"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title='The human-readable name for this unit e.g. “Bed” or “Hours"'
                >
                  Name
                </Tooltip>
              }
              name={['unit', 'name']}
              rules={[{ required: true, message: 'Required field!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The identifier of the unit taken from the scheme if applicable e.g. kgm for Kilogram."
                >
                  Identifier
                </Tooltip>
              }
              name={['unit', 'identifier']}
            >
              <Input />
            </Form.Item>
            <div className="flex flex-row gap-4">
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The number of units available as of the last update."
                  >
                    Available
                  </Tooltip>
                }
                name="available"
                rules={[{ required: true, message: 'Required field!' }]}
              >
                <InputNumber className="w-auto" />
              </Form.Item>
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The maximum number of units that can be available for this service, if applicable."
                  >
                    Maximum
                  </Tooltip>
                }
                name="maximum"
              >
                <InputNumber className="w-auto" />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The scheme which formalizes the unit, if applicable e.g. “SI” for Standard International Units such as Kilogram, Litre, etc."
                >
                  Scheme
                </Tooltip>
              }
              name={['unit', 'scheme']}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The URI to the definition of the unit, if applicable"
                >
                  URI
                </Tooltip>
              }
              name={['unit', 'uri']}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The datetime when this capacity was last updated or changed."
                >
                  Last Updated
                </Tooltip>
              }
              name="updated"
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss.SSS"
                showTime
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A Human-Friendly description of this service capacity e.g. “Beds available for people experiencing homelessness”."
            >
              Description
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
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

export default AddCapacityForm;
