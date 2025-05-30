import { Form, Input, Tooltip, InputNumber, FormInstance } from 'antd';
import { useState, useEffect } from 'react';
import Contact from '../../../interface/model/Contact';
import Phone from '../../../interface/model/Phone';
import Schedule from '../../../interface/model/Schedule';
import AddContactForm from './AddContactForm';
import AddPhoneForm from './AddPhoneForm';
import AddScheduleForm from './AddScheduleForm';
import Language from '../../../interface/model/Language';
import Accessibility from '../../../interface/model/Accessibility';
import Address from '../../../interface/model/Address';
import AddLanguageForm from './AddLanguageForm';
import AddAddressForm from './AddAddressForm';
import AddAccessibilityForm from './AddAccessibilityForm';
import DisplayTable from '../DisplayTable';
import {
  languageColumns,
  addressColumns,
  contactColumns,
  accessibilityColumns,
  scheduleColumns,
  phoneColumns,
} from '../../../data/FormTableColumns';
import Organization from '../../../interface/model/Organization';
import {
  scheduleParser,
  reverseScheduleParser,
} from '../../../utils/form/ParseUtils';

interface AddLocationFormProps {
  parentForm: FormInstance;
  existingContacts: Contact[];
  existingPhones: Phone[];
  existingLanguages: Language[];
  existingSchedules: Schedule[];
}

const AddLocationForm = ({
  parentForm,
  existingContacts,
  existingLanguages,
  existingPhones,
  existingSchedules,
}: AddLocationFormProps) => {
  const [organization, setOrganization] = useState<Organization | undefined>();

  useEffect(() => {
    setOrganization(parentForm.getFieldValue('organization') ?? undefined);
  }, [parentForm]);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-2/3">
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <div className="flex flex-row gap-2">
            <Form.Item
              className="w-1/2"
              label={
                <Tooltip placement="topLeft" title="The name of the location.">
                  Name
                </Tooltip>
              }
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label={
                <Tooltip
                  placement="topLeft"
                  title="An (optional) alternative name of the location."
                >
                  Alternate Name
                </Tooltip>
              }
              name="alternate_name"
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of the location."
              >
                Description
              </Tooltip>
            }
            name="description"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of the access to public or private transportation to and from the location."
              >
                Transportation
              </Tooltip>
            }
            name="transportation"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <div className="flex flex-row gap-2 justify-center">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The latitude of the location expressed in decimal degrees in WGS84 datum."
                >
                  Latitude
                </Tooltip>
              }
              name="latitude"
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The longitude of the location expressed in decimal degrees in WGS84 datum."
                >
                  Longitude
                </Tooltip>
              }
              name="longitude"
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="A third party identifier for the location, which can be drawn from other services e.g. UK UPRN."
                >
                  External Identifier
                </Tooltip>
              }
              name="external_identifier"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The scheme used for the location’s external_identifier e.g. UK UPRN."
                >
                  External Identifier Type
                </Tooltip>
              }
              name="external_identifier_type"
            >
              <Input />
            </Form.Item>
          </div>
        </div>
      </div>
      <DisplayTable<Language>
        columns={languageColumns}
        parentForm={parentForm}
        fieldLabel="languages"
        tooltipTitle="The details of the languages that are spoken at locations or services. This does not include languages which can only be used with interpretation."
        formLabel="Languages"
        formProps={{
          existingObjects: existingLanguages,
          existingLabels: ['name', 'note'],
          formTitle: 'Add Language',
          formItems: (_, ref) => <AddLanguageForm ref={ref} />,
          parseFields: {},
          parseObject: {},
        }}
      />
      <DisplayTable<Address>
        columns={addressColumns}
        parentForm={parentForm}
        fieldLabel="addresses"
        tooltipTitle="The addresses of locations where organizations operate."
        formLabel="Addresses"
        formProps={{
          existingObjects: [],
          existingLabels: [],
          formTitle: 'Add Address',
          formItems: (_, ref) => <AddAddressForm ref={ref} />,
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
      <DisplayTable<Accessibility>
        columns={accessibilityColumns}
        parentForm={parentForm}
        fieldLabel="accessibility"
        tooltipTitle="The details of the arrangements for access to locations for people who have disabilities"
        formLabel="Accessibility"
        formProps={{
          existingObjects: [],
          existingLabels: [],
          formTitle: 'Add Accessibililty',
          formItems: () => <AddAccessibilityForm />,
          parseFields: {},
          parseObject: {},
        }}
      />
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
      <DisplayTable<Schedule>
        columns={scheduleColumns}
        parentForm={parentForm}
        fieldLabel="schedules"
        tooltipTitle="The details of when a service or location is open."
        formLabel="Schedules"
        formProps={{
          existingObjects: existingSchedules,
          existingLabels: ['description'],
          formTitle: 'Add Schedule',
          formItems: (_, ref) => <AddScheduleForm ref={ref} />,
          parseFields: scheduleParser,
          parseObject: reverseScheduleParser,
        }}
      />
    </>
  );
};

export default AddLocationForm;
