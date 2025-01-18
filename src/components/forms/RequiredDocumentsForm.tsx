import React, { JSX, useState } from 'react';
import {
  Alert,
  Button,
  Form,
  FormInstance,
  FormProps,
  Input,
  Select,
  Space,
} from 'antd';
import {
  createRequiredDocument,
  RequiredDocumentError,
} from '../../api/lib/requiredDocuments';
import RequiredDocument from '../../interface/model/RequiredDocument';
import { documentTypeOptions } from '../../data/RequiredDocumentsData';

interface RequiredDocumentFormProps {
  parentForm: FormInstance;
  setRequiredDocument: React.Dispatch<React.SetStateAction<RequiredDocument>>;
}

const RequiredDocumentForm = ({
  parentForm,
  setRequiredDocument,
}: RequiredDocumentFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();

  const onFinish: FormProps<RequiredDocument>['onFinish'] = async (values) => {
    try {
      const response = await createRequiredDocument(values);
      console.log(response);
      parentForm.setFieldValue('requiredDocuments', response.data);
      setRequiredDocument(response.data);
      form.resetFields();
    } catch (error) {
      if (error instanceof RequiredDocumentError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'An error occurred while creating the required document'
        );
      }
    }
  };

  return (
    <div>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage('')}
          className="my-5"
        />
      )}
      <Form form={form} variant="filled" onFinish={onFinish}>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select Type"
            options={documentTypeOptions}
          />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[
            { required: true, message: 'Required field!' },
            { type: 'url', warningOnly: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RequiredDocumentForm;
