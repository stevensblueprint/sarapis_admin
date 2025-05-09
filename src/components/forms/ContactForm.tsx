import { Table, Form, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Contact from '../../interface/model/Contact';
import { FormInstance } from 'antd';
import AddContactForm from './nested_forms/AddContactForm';
import { ColumnsType } from 'antd/es/table';

const ContactForm = ({
  form,
  organizationId,
}: {
  form: FormInstance;
  organizationId: string;
}) => {
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [contactData, setContactData] = useState<Contact[]>([]);

  const contactColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '90%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Contact) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteContact(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingContacts = form.getFieldValue('contacts') || [];
    setContactData(existingContacts);
  }, [form]);

  const handleAddContact = (contact: Contact) => {
    const newContacts = [...contactData, contact];
    setContactData(newContacts);
    form.setFieldsValue({ contacts: newContacts });
  };

  const handleDeleteContact = (contactToDelete: Contact) => {
    const updatedContacts = contactData.filter(
      (contact) => contact !== contactToDelete
    );
    setContactData(updatedContacts);
    form.setFieldsValue({ contacts: updatedContacts });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Contacts</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowContactModal(true)}
                size="small"
              />
            </div>
          }
          name="contacts"
        >
          <Table columns={contactColumns} dataSource={contactData} />
        </Form.Item>
        <AddContactForm
          showModal={showContactModal}
          closeModal={() => setShowContactModal(false)}
          addObject={handleAddContact}
          objectData={contactData}
          organizationId={organizationId}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Phones</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="phones"
        >
          <Table />
        </Form.Item>
      </div>
    </div>
  );
};

export default ContactForm;
