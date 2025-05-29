import { FormInstance } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

/* eslint-disable  @typescript-eslint/no-explicit-any */

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
) => {
  const obj = JSON.parse(jsonValue) as T;
  const parsedFields = Object.fromEntries(
    Object.entries(parseFields).map(([key, parser]) => [key, parser(obj[key])])
  );
  console.log(parsedFields);
  // todo set nested form data
  form.setFieldsValue({
    ...obj,
    ...parsedFields,
  });
};
