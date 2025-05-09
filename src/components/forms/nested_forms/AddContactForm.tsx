import { Modal, Button, Form, Input, message, Select, Divider } from 'antd';
import Funding from '../../../interface/model/Funding';
import { getOrganizationById } from '../../../api/lib/organizations';
import { useEffect, useState } from 'react';
import Organization from '../../../interface/model/Organization';
import Contact from '../../../interface/model/Contact';

const AddContactForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  organizationId,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (contact: Contact) => void;
  objectData: Contact[];
  organizationId: string;
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [existingContacts, setExistingContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getOrganizationById(organizationId);
        const data = response.data as Organization;
        setExistingContacts(data.contacts || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganization();
  }, [organizationId]);

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
    form.resetFields();
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
        <strong>Create New Funding Source</strong>
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
