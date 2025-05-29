import { FormInstance } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { JSX } from 'react';
import React from 'react';
import { ColumnsType } from 'antd/es/table';

/* eslint-disable  @typescript-eslint/no-explicit-any */

type SetterEntry<T> = {
  setObjectState: React.Dispatch<React.SetStateAction<T>>;
  formLabel: string;
};

type ParseFieldEntry = {
  parser: (val: any) => any;
  inputPath?: string;
};

export interface NestedFormProps<T> {
  showModal: boolean;
  closeModal: () => void;
  addObject: (object: T) => void;
  objectData: T[];
  existingObjects: T[];
  existingLabels: string[];
  formItems: (form: FormInstance, ref: React.Ref<any>) => JSX.Element;
  formTitle: string;
  parseFields: Record<string, ParseFieldEntry>;
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
    parseFields: Record<string, ParseFieldEntry>;
    parseObject: Record<string, (val: any) => any>;
  };
}

export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
};

const setNestedValue = (obj: any, path: string, value: any): void => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  target[lastKey] = value;
};

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
  parseFields: Record<string, ParseFieldEntry>,
  resetState: () => void
): Promise<void> => {
  try {
    const values = await form.validateFields();

    const newObject = { ...values } as T;

    console.log(newObject);

    Object.entries(parseFields).forEach(
      ([outputKey, { parser, inputPath }]) => {
        const targetPath = inputPath ?? outputKey;
        const rawValue = getNestedValue(values, targetPath);
        const parsedValue = parser(rawValue);
        setNestedValue(newObject, targetPath, parsedValue);
      }
    );

    if (isDuplicate(newObject, objectData)) {
      showError('Duplicate objects not allowed!', messageApi);
      return;
    }

    addObject(newObject);
    closeModal();
    form.resetFields();
    resetState();
  } catch (err) {
    console.error('Form validation failed:', err);
  }
};

export const handleSelect = <T extends Record<string, any>>(
  jsonValue: string,
  parseFields: Record<string, ParseFieldEntry>,
  form: FormInstance,
  setters: SetterEntry<any>[]
): T => {
  const rawObj = JSON.parse(jsonValue) as T;
  const newObj = { ...rawObj };

  Object.entries(parseFields).forEach(([outputKey, { parser, inputPath }]) => {
    const rawVal = getNestedValue(rawObj, inputPath ?? outputKey);
    const parsed = parser(rawVal);
    setNestedValue(newObj, inputPath ?? outputKey, parsed);
  });

  setters.forEach(({ setObjectState, formLabel }) => {
    const value = getNestedValue(newObj, formLabel);
    setObjectState(value);
  });

  form.setFieldsValue(newObj);

  return newObj;
};
