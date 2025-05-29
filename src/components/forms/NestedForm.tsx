import {
  Form,
  message,
  Modal,
  Button,
  Select,
  Divider,
  FormInstance,
} from 'antd';
import { JSX, useRef, useState } from 'react';
import React from 'react';
import { handleAddObject } from '../../utils/form/FormUtils';

/* eslint-disable  @typescript-eslint/no-explicit-any */

type WithoutMetadata<T> = Omit<T, 'metadata'>;

interface NestedFormProps<T> {
  showModal: boolean;
  closeModal: () => void;
  addObject: (object: T) => void;
  objectData: T[];
  existingObjects: T[];
  existingLabels: string[];
  formItems: (form: FormInstance, ref: React.Ref<any>) => JSX.Element;
  formTitle: string;
  parseFields: Record<string, (val: any) => any>;
}

const NestedForm = <T,>({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingObjects,
  existingLabels,
  formItems,
  formTitle,
  parseFields,
}: NestedFormProps<T>) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedObject, setSelectedObject] = useState<T | null>(null);
  const formRef = useRef<{ resetState: () => void }>(null);

  const handleSelect = (jsonValue: string) => {
    const obj = JSON.parse(jsonValue) as T;
    setSelectedObject(obj);
    // todo set nested form data
    form.setFieldsValue(obj);
  };

  const getNestedValue = (obj: any, path: string): any =>
    path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key];
      }
      return undefined;
    }, obj);

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
              options={Array.from(
                new Set(
                  existingObjects.map((value: WithoutMetadata<T>) => {
                    return JSON.stringify(value);
                  })
                )
              )
                .map((value) => JSON.parse(value) as T)
                .map((obj) => ({
                  value: JSON.stringify(obj),
                  label: existingLabels
                    .map((label) => getNestedValue(obj, label))
                    .join(' - '),
                }))}
              onSelect={handleSelect}
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
