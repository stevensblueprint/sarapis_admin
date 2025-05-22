import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Select,
  Divider,
  Table,
} from 'antd';
import { useState } from 'react';
import Contact from '../../../interface/model/Contact';
import Phone from '../../../interface/model/Phone';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddPhoneForm from './AddPhoneForm';

const AddContactForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingContacts,
  existingPhones,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (contact: Contact) => void;
  objectData: Contact[];
  existingContacts: Contact[];
  existingPhones: Phone[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [phoneData, setPhoneData] = useState<Phone[]>([]);

  const phoneColumns: ColumnsType = [
    {
      title: 'Number',
      dataIndex: 'number',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Extension',
      dataIndex: 'extension',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '50%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Phone) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeletePhone(record)}
        />
      ),
    },
  ];

  const handleAddPhone = (phone: Phone) => {
    const newPhones = [...phoneData, phone];
    setPhoneData(newPhones);
  };

  const handleDeletePhone = (phoneToDelete: Phone) => {
    const updatedPhones = phoneData.filter((phone) => phone !== phoneToDelete);
    setPhoneData(updatedPhones);
  };

  const isDuplicate = (newContact: Contact) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newContact)
    );
  };

  const handleSelect = (jsonValue: string) => {
    const contact = JSON.parse(jsonValue) as Contact;
    setSelectedContact(contact);
  };

  const handleClear = () => {
    setSelectedContact(null);
  };

  const addNewObject = async () => {
    if (selectedContact) {
      if (isDuplicate(selectedContact)) {
        showError();
        return;
      }
      addObject(selectedContact);
    } else {
      const values = await form.validateFields();
      const newContact: Contact = { ...values, phones: phoneData };
      if (isDuplicate(newContact)) {
        showError();
        return;
      }
      addObject(newContact);
    }

    closeModal();
    form.resetFields();
    setPhoneData([]);
    setSelectedContact(null);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate contacts not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setPhoneData([]);
        setSelectedContact(null);
      }}
      title="Add Contact"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Contact</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Contact"
          options={Array.from(
            new Set(existingContacts.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Contact)
            .map((contact) => ({
              value: JSON.stringify(contact),
              label: contact.name,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={selectedContact ? JSON.stringify(selectedContact) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Contact</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedContact !== null}
      >
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item className="w-1/2" label="Title" name="title">
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="Department" name="department">
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Invalid Email!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Phones</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowPhoneModal(true)}
                size="small"
              />
            </div>
          }
          name="phones"
        >
          <Table columns={phoneColumns} dataSource={phoneData} />
        </Form.Item>
        <AddPhoneForm
          showModal={showPhoneModal}
          closeModal={() => setShowPhoneModal(false)}
          addObject={handleAddPhone}
          objectData={phoneData}
          existingPhones={existingPhones}
        />
      </Form>
    </Modal>
  );
};

export default AddContactForm;
