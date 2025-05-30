import { useState, useEffect } from 'react';
import Contact from '../../interface/model/Contact';
import { FormInstance } from 'antd';
import AddContactForm from './nested_forms/AddContactForm';
import Organization from '../../interface/model/Organization';
import AddPhoneForm from './nested_forms/AddPhoneForm';
import Phone from '../../interface/model/Phone';
import DisplayTable from './DisplayTable';
import Language from '../../interface/model/Language';
import { contactColumns, phoneColumns } from '../../data/FormTableColumns';
import {
  phoneExistingLabels,
  contactExistingLabels,
} from '../../data/FormExistingLabels';

interface ContactFormProps {
  parentForm: FormInstance;
}

const ContactForm = ({ parentForm }: ContactFormProps) => {
  const [organization, setOrganization] = useState<Organization | undefined>();
  const [existingPhones, setExistingPhones] = useState<Phone[]>([]);
  const [existingLanguages, setExistingLanguages] = useState<Language[]>([]);

  useEffect(() => {
    setExistingLanguages(parentForm.getFieldValue('languages') ?? []);
    setExistingPhones(parentForm.getFieldValue('phones') ?? []);
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
          updateParentObject={(objects: Phone[]) => setExistingPhones(objects)}
          formProps={{
            existingObjects: organization?.phones ?? [],
            existingLabels: phoneExistingLabels,
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
            existingObjects: organization?.contacts ?? [],
            existingLabels: contactExistingLabels,
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
