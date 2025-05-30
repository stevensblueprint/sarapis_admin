import { Form, message, Modal, Button, Select, Divider, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import {
  handleAddObject,
  handleSelect,
  NestedFormProps,
  getNestedValue,
} from '../../utils/form/FormUtils';
import AddAttributeForm from './nested_forms/AddAttributeForm';
import Attribute from '../../interface/model/Attribute';

/* eslint-disable  @typescript-eslint/no-explicit-any */

const NestedForm = <T extends { metadata?: any }>({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingObjects,
  existingLabels,
  formItems,
  formTitle,
  parseFields,
  parseObject,
  attributeClassName,
  modalWidth,
}: NestedFormProps<T>) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedObject, setSelectedObject] = useState<T | null>(null);
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const formRef = useRef<{ resetState: () => void }>(null);

  const createSelectOptions = (
    existingObjects: T[]
  ): { value: string; label: string }[] => {
    const options = Array.from(
      new Set(
        existingObjects.map((obj) => {
          delete obj.metadata;
          return JSON.stringify(obj);
        })
      )
    )
      .map((value) => JSON.parse(value) as T)
      .map((obj) => ({
        value: JSON.stringify(obj),
        label: existingLabels
          .map((label) => getNestedValue(obj, label))
          .filter((val) => {
            if (val === undefined || val === null) return false;
            if (typeof val === 'string' && val.trim() === '') return false;
            if (Array.isArray(val) && val.length === 0) return false;
            return true;
          })
          .join(' - '),
      }));

    return options;
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setSelectedObject(null);
        setAttributeData([]);
        formRef.current?.resetState();
      }}
      title={formTitle}
      width={modalWidth ?? 520}
      footer={
        <Button
          type="primary"
          onClick={() => {
            handleAddObject(
              form,
              objectData,
              messageApi,
              addObject,
              closeModal,
              parseFields,
              () => formRef.current?.resetState()
            );
            setSelectedObject(null);
            setAttributeData([]);
          }}
        >
          Add
        </Button>
      }
    >
      {contextHolder}
      {existingObjects.length !== 0 && (
        <>
          <div className="flex flex-col gap-2 pb-2">
            <strong>Select Existing</strong>
            <Select
              showSearch
              placeholder="Select..."
              options={createSelectOptions(existingObjects)}
              onSelect={(value) =>
                setSelectedObject(handleSelect(value, parseObject, form) as T)
              }
              value={
                selectedObject ? JSON.stringify(selectedObject) : undefined
              }
            />
          </div>

          <Divider />
          <div className="pb-2">
            <strong>Create New</strong>
          </div>
        </>
      )}
      <Form form={form} layout="vertical" requiredMark={false}>
        {formItems(form, formRef)}
        <div className="flex justify-center">
          <Form.Item
            className={`${attributeClassName ?? ''}`}
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
        </div>
        <AddAttributeForm
          parentForm={form}
          showModal={showAttributeModal}
          closeModal={() => setShowAttributeModal(false)}
          objectData={attributeData}
          addObject={(attributes: Attribute[]) => setAttributeData(attributes)}
        />
      </Form>
    </Modal>
  );
};

export default NestedForm;
