import { Table, Form, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Contact from '../../interface/model/Contact';
import { FormInstance } from 'antd';
import AddContactForm from './nested_forms/AddContactForm';
import { ColumnsType } from 'antd/es/table';
import Organization from '../../interface/model/Organization';
import AddPhoneForm from './nested_forms/AddPhoneForm';
import Phone from '../../interface/model/Phone';

const ContactForm = ({ form }: { form: FormInstance }) => {
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [contactData, setContactData] = useState<Contact[]>([]);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [phoneData, setPhoneData] = useState<Phone[]>([]);
  const [organization, setOrganization] = useState<Organization | undefined>();

  const contactColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
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

  useEffect(() => {
    const existingContacts = form.getFieldValue('contacts') || [];
    setContactData(existingContacts);
    const existingPhones = form.getFieldValue('phones') || [];
    setPhoneData(existingPhones);
    const selectedOrganization =
      form.getFieldValue('organization') ?? undefined;
    setOrganization(selectedOrganization);
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

  const handleAddPhone = (phone: Phone) => {
    const newPhones = [...phoneData, phone];
    setPhoneData(newPhones);
    form.setFieldsValue({ phones: newPhones });
  };

  const handleDeletePhone = (phoneToDelete: Phone) => {
    const updatedPhones = phoneData.filter((phone) => phone !== phoneToDelete);
    setPhoneData(updatedPhones);
    form.setFieldsValue({ phones: updatedPhones });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
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
          existingPhones={organization?.phones ?? []}
        />
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
          existingContacts={organization?.contacts ?? []}
          existingPhones={
            organization ? [...organization.phones!, ...phoneData] : phoneData
          }
        />
      </div>
    </div>
  );
};

export default ContactForm;
