import { Form, message, Modal, Button, Select, Divider } from 'antd';
import { useRef, useState } from 'react';
import {
  handleAddObject,
  handleSelect,
  NestedFormProps,
  getNestedValue,
} from '../../utils/form/FormUtils';

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
}: NestedFormProps<T>) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedObject, setSelectedObject] = useState<T | null>(null);
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
        formRef.current?.resetState();
      }}
      title={formTitle}
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
                setSelectedObject(
                  handleSelect(value, parseObject, form, []) as T
                )
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
      </Form>
    </Modal>
  );
};

export default NestedForm;
