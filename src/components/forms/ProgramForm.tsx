import { useState } from 'react';
import {
  Alert,
  Button,
  Form,
  FormInstance,
  FormProps,
  Input,
  Space,
} from 'antd';
import { createProgram, ProgramError } from '../../api/lib/programs';
import Program from '../../interface/model/Program';

interface ProgramFormProps {
  parentForm: FormInstance;
}

const ProgramForm = ({ parentForm }: ProgramFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();

  const onFinish: FormProps<Program>['onFinish'] = async (values) => {
    try {
      const response = await createProgram(values);
      console.log(response);
      parentForm.setFieldValue('programs', response.data);
      form.resetFields();
    } catch (error) {
      if (error instanceof ProgramError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred while creating the program');
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
          label="Program Name"
          name="name"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Alternate Name"
          name="alternateName"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProgramForm;
