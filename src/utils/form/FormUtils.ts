import { FormInstance } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { JSX } from 'react';
import { ColumnsType } from 'antd/es/table';

/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface NestedFormProps<T> {
  showModal: boolean;
  closeModal: () => void;
  addObject: (object: T) => void;
  objectData: T[];
  existingObjects: T[];
  existingLabels: string[];
  formItems: (form: FormInstance, ref: React.Ref<any>) => JSX.Element;
  formTitle: string;
  parseFields: Record<string, (val: any) => any>;
  parseObject: Record<string, (val: any) => any>;
}

export interface DisplayTableProps<T> {
  columns: ColumnsType<T>;
  deleteWidth?: string | number;
  parentForm: FormInstance;
  fieldLabel: string;
  tooltipTitle: string;
  formLabel: string;
  formProps: {
    existingObjects: T[];
    existingLabels: string[];
    formItems: (form: FormInstance, ref: React.Ref<any>) => JSX.Element;
    formTitle: string;
    parseFields: Record<string, (val: any) => any>;
    parseObject: Record<string, (val: any) => any>;
  };
}

export const isDuplicate = <T>(newObject: T, objectData: T[]): boolean => {
  return objectData.some(
    (existing) => JSON.stringify(existing) === JSON.stringify(newObject)
  );
};

export const handleAddNestedObject = <T>(
  object: T,
  objectData: T[],
  field: string,
  form: FormInstance
): T[] => {
  const newObjects = [...objectData, object];
  form.setFieldValue([field], newObjects);
  return newObjects;
};

export const handleDeleteNestedObject = <T>(
  object: T,
  objectData: T[],
  field: string,
  form: FormInstance
): T[] => {
  const newObjects = objectData.filter((obj) => obj !== object);
  form.setFieldValue([field], newObjects);
  return newObjects;
};

export const showError = (message: string, messageApi: MessageInstance) => {
  messageApi.open({
    type: 'error',
    content: message,
    duration: 5,
  });
};

export const handleAddObject = async <T>(
  form: FormInstance,
  objectData: T[],
  messageApi: MessageInstance,
  addObject: (newObject: T) => void,
  closeModal: () => void,
  parseFields: Record<string, (val: any) => any>,
  resetState: () => void
) => {
  const values = await form.validateFields();
  const newObject = {
    ...values,
    ...Object.fromEntries(
      Object.entries(parseFields).map(([key, parser]) => [
        key,
        parser(values[key]),
      ])
    ),
  };

  if (isDuplicate(newObject, objectData)) {
    showError('Duplicate URLs not allowed!', messageApi);
  } else {
    addObject(newObject);
    closeModal();
    form.resetFields();
    resetState();
  }
};

export const handleSelect = <T extends Record<string, any>>(
  jsonValue: string,
  parseFields: Record<string, (val: any) => any>,
  form: FormInstance
): T => {
  const obj = JSON.parse(jsonValue) as T;
  const parsedFields = Object.fromEntries(
    Object.entries(parseFields).map(([key, parser]) => [key, parser(obj[key])])
  );
  // todo set nested form data
  form.setFieldsValue({
    ...obj,
    ...parsedFields,
  });

  return {
    ...obj,
    ...parsedFields,
  };
};
