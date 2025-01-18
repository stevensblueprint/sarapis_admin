import { JSX, useState } from 'react';
import { Alert, Form, FormInstance, FormProps, Input, Select } from 'antd';
import Phone from '../../interface/model/Phone';
import { createPhone, PhoneError } from '../../api/lib/phones';
import { phoneTypeOptions } from '../../data/PhoneData';

interface PhoneFormProps {
  parentForm: FormInstance;
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
}

const PhoneForm = ({ parentForm, setPhones }: PhoneFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();

  const onFinish: FormProps<Phone>['onFinish'] = async (values) => {
    try {
      const response = await createPhone(values);
      console.log(response);
      parentForm.setFieldValue('phones', response.data);
      setPhones((prev) => [...prev, response.data]);
      form.resetFields();
    } catch (error) {
      if (error instanceof PhoneError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred while creating the phone');
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
          label="Phone Number"
          name="number"
          rules={[
            { required: true, message: 'Required field!' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Phone number must be 10 digits',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Extension"
          name="extension"
          rules={[
            {
              pattern: /^[0-9]{1,5}$/,
              message: 'Phone extension must be between 1 and 5 digits',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Type"
          name="type"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select a Type"
            options={phoneTypeOptions}
          />
        </Form.Item>
        <Form.Item
          label="Language"
          name="language"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select a Language"
            options={phoneTypeOptions}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhoneForm;
