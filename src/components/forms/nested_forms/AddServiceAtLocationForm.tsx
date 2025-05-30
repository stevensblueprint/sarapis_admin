import { Form, Tooltip, Input, FormInstance } from 'antd';
import { JSX, forwardRef, useImperativeHandle } from 'react';
import DisplayTable from '../DisplayTable';
import ServiceArea from '../../../interface/model/ServiceArea';
import { ColumnsType } from 'antd/es/table';
import AddServiceAreaForm from './AddServiceAreaForm';
import Contact from '../../../interface/model/Contact';
import AddContactForm from './AddContactForm';
import Language from '../../../interface/model/Language';
import Phone from '../../../interface/model/Phone';
import AddPhoneForm from './AddPhoneForm';
import Schedule from '../../../interface/model/Schedule';
import AddScheduleForm from './AddScheduleForm';
import {
  scheduleParser,
  reverseScheduleParser,
} from '../../../utils/form/ParseUtils';

interface AddServiceAtLocationFormProps {
  parentForm: FormInstance;
  existingServiceAreas: ServiceArea[];
  existingContacts: Contact[];
  existingPhones: Phone[];
  existingLanguages: Language[];
  existingSchedules: Schedule[];
}

const AddServiceAtLocationForm = forwardRef(
  (
    {
      parentForm,
      existingServiceAreas,
      existingContacts,
      existingPhones,
      existingLanguages,
      existingSchedules,
    }: AddServiceAtLocationFormProps,
    ref
  ): JSX.Element => {
    useImperativeHandle(ref, () => ({
      resetState: () => {},
    }));

    const serviceAreaColumns: ColumnsType = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
        ellipsis: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '60%',
        ellipsis: true,
      },
    ];

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

    const scheduleColumns: ColumnsType = [
      {
        title: 'Opens At',
        dataIndex: 'opens_at',
        width: '15%',
        ellipsis: true,
      },
      {
        title: 'Closes At',
        dataIndex: 'closes_at',
        width: '15%',
        ellipsis: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '60%',
        ellipsis: true,
      },
    ];

    return (
      <>
        <div className="flex justify-center">
          <Form.Item
            className="w-2/3"
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of the service at this specific location."
              >
                Description
              </Tooltip>
            }
            name="description"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
        <DisplayTable<ServiceArea>
          columns={serviceAreaColumns}
          parentForm={parentForm}
          fieldLabel="service_areas"
          tooltipTitle="The details of the geographic area for which a service is available."
          formLabel="Service Areas"
          formProps={{
            existingObjects: existingServiceAreas,
            existingLabels: ['name', 'description'],
            formTitle: 'Add Service Area',
            formItems: (_, ref) => <AddServiceAreaForm ref={ref} />,
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
            existingObjects: existingContacts,
            existingLabels: ['name', 'email'],
            formTitle: 'Add Contact',
            formItems: (form, ref) => (
              <AddContactForm
                parentForm={form}
                existingPhones={existingPhones}
                existingLanguages={existingLanguages}
                ref={ref}
              />
            ),
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
            existingObjects: existingPhones,
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
        <div className="flex justify-center"></div>
      </>
    );
  }
);

export default AddServiceAtLocationForm;
