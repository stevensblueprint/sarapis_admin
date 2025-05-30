import { useState, useEffect } from 'react';
import Contact from '../../interface/model/Contact';
import { FormInstance } from 'antd';
import AddContactForm from './nested_forms/AddContactForm';
import { ColumnsType } from 'antd/es/table';
import Organization from '../../interface/model/Organization';
import AddPhoneForm from './nested_forms/AddPhoneForm';
import Phone from '../../interface/model/Phone';
import DisplayTable from './DisplayTable';
import Language from '../../interface/model/Language';

interface ContactFormProps {
  parentForm: FormInstance;
  existingContacts: Contact[];
  existingPhones: Phone[];
  existingLanguages: Language[];
}

const ContactForm = ({
  parentForm,
  existingContacts,
  existingLanguages,
  existingPhones,
}: ContactFormProps) => {
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
  ];

  useEffect(() => {
    setOrganization(parentForm.getFieldValue('organization') ?? undefined);
  }, [parentForm]);

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <DisplayTable<Phone>
          columns={phoneColumns}
          parentForm={parentForm}
          fieldLabel="phones"
          tooltipTitle="The details of the telephone numbers used to contact organizations, services, and locations."
          formLabel="Phones"
          formProps={{
            existingObjects: organization
              ? [...organization.phones!, ...existingPhones]
              : existingPhones,
            existingLabels: ['number', 'extension'],
            formTitle: 'Add Phone',
            formItems: (form, ref) => (
              <AddPhoneForm
                existingLanguages={existingLanguages}
                parentForm={form}
                ref={ref}
              />
            ),
            parseFields: {},
            parseObject: {},
          }}
        />
        <DisplayTable<Contact>
          columns={contactColumns}
          parentForm={parentForm}
          fieldLabel="contacts"
          tooltipTitle="The details of the named contacts for services and organizations."
          formLabel="Contacts"
          formProps={{
            existingObjects: organization
              ? [...organization.contacts!, ...existingContacts]
              : existingContacts,
            existingLabels: ['name', 'email'],
            formTitle: 'Add Contact',
            formItems: (form, ref) => (
              <AddContactForm
                existingPhones={
                  organization
                    ? [...organization.phones!, ...existingPhones]
                    : existingPhones
                }
                existingLanguages={existingLanguages}
                parentForm={form}
                ref={ref}
              />
            ),
            parseFields: {},
            parseObject: {},
          }}
        />
      </div>
    </div>
  );
};

export default ContactForm;
