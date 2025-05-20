import { Modal, Button, Form, Input, message, Select, Divider } from 'antd';
import { useState } from 'react';
import Contact from '../../../interface/model/Contact';

const AddContactForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingContacts,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (contact: Contact) => void;
  objectData: Contact[];
  existingContacts: Contact[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
      const trimmed: Funding = { ...values, source: values.source.trim() };
      if (isDuplicate(trimmed)) {
        showError();
        return;
      }
      addObject(trimmed);
    }

    form.resetFields();
    setSelectedContact(null);
    closeModal();
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
          options={existingContacts.map((contact) => ({
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
        <Form.Item
          label="Source"
          name="source"
          rules={[{ required: true, message: 'Please enter a source.' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContactForm;
