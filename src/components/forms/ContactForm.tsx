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
import Contact from '../../interface/model/Contact';
import { JSX, useEffect, useState } from 'react';
import { ContactError, createContact } from '../../api/lib/contacts';
import { Service } from '../../interface/model/Service';
import { getAllServices } from '../../api/lib/services';
import Response from '../../interface/Response';
import { visibilityOptions } from '../../data/ContactData';

interface ContactFormProps {
  parentForm: FormInstance;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactForm = ({
  parentForm,
  setContacts,
}: ContactFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        const data = response.data as Response<Service[]>;
        data.contents?.forEach((service) => {
          setServices((prev) => [...prev, service]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  });

  const onFinish: FormProps<Contact>['onFinish'] = async (values) => {
    try {
      const response = await createContact(values);
      console.log(response);
      parentForm.setFieldValue('contacts', response.data);
      setContacts((prev) => [...prev, response.data]);
      form.resetFields();
    } catch (error) {
      if (error instanceof ContactError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred while creating the contact');
      }
    }
  };
  // TODO: Add phones table

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
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Service"
          name="service"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select a Service"
            options={services.map((service) => {
              return { value: service.id, label: service.name };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact Department"
          name="department"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Required field!' },
            { type: 'email', message: 'Invalid email address' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Visibility"
          name="visibility"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            showSearch
            placeholder="Select Visibility"
            options={visibilityOptions}
          />
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

export default ContactForm;
