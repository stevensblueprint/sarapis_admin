import { Form, Tooltip, Input, FormInstance, Button } from 'antd';
import { JSX, forwardRef, useImperativeHandle, useState } from 'react';
import DisplayTable from '../DisplayTable';
import ServiceArea from '../../../interface/model/ServiceArea';
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
import {
  phoneColumns,
  contactColumns,
  scheduleColumns,
  serviceAreaColumns,
} from '../../../data/FormTableColumns';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Location from '../../../interface/model/Location';
import AddLocationForm from './AddLocationForm';
import NestedForm from '../NestedForm';
import JSONDataModal from '../../JSONDataModal';
import {
  contactExistingLabels,
  scheduleExistingLabels,
  phoneExistingLabels,
  serviceAreaExistingLabels,
} from '../../../data/FormExistingLabels';

interface AddServiceAtLocationFormProps {
  parentForm: FormInstance;
  existingServiceAreas: ServiceArea[];
  existingContacts: Contact[];
  existingPhones: Phone[];
  existingLanguages: Language[];
  existingSchedules: Schedule[];
  existingLocations: Location[];
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
      existingLocations,
    }: AddServiceAtLocationFormProps,
    ref
  ): JSX.Element => {
    useImperativeHandle(ref, () => ({
      resetState: () => {
        setShowLocationModal(false);
      },
    }));

    const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
    const selectedLocation = Form.useWatch('location', parentForm);
    const [showJSONModal, setShowJSONModal] = useState<boolean>(false);

    const handleAddLocation = (newLocation: Location) => {
      parentForm.setFieldsValue({ location: newLocation });
    };

    const handleDeleteLocation = () => {
      parentForm.setFieldsValue({ location: undefined });
    };

    return (
      <>
        <JSONDataModal
          showModal={showJSONModal}
          closeModal={() => setShowJSONModal(false)}
          data={selectedLocation ?? {}}
        />
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
            existingLabels: serviceAreaExistingLabels,
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
            existingLabels: contactExistingLabels,
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
        <DisplayTable<Schedule>
          columns={scheduleColumns}
          parentForm={parentForm}
          fieldLabel="schedules"
          tooltipTitle="The details of when a service or location is open."
          formLabel="Schedules"
          formProps={{
            existingObjects: existingSchedules,
            existingLabels: scheduleExistingLabels,
            formTitle: 'Add Schedule',
            formItems: (_, ref) => <AddScheduleForm ref={ref} />,
            parseFields: scheduleParser,
            parseObject: reverseScheduleParser,
          }}
        />
        <div className="flex justify-center">
          <Form.Item
            label={
              <div className="flex flex-row items-center gap-2 pt-2">
                <Tooltip
                  placement="topLeft"
                  title="The details of the locations where organizations operate. Locations may be virtual, and one organization may have many locations."
                >
                  Location
                </Tooltip>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowLocationModal(true)}
                  size="small"
                />
              </div>
            }
            name="location"
          >
            {selectedLocation ? (
              <div className="flex flex-row items-center gap-2 w-full max-w-xl">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis flex-1">
                  <span
                    className="truncate hover:cursor-pointer"
                    onClick={() => setShowJSONModal(true)}
                  >
                    {selectedLocation.name} - {selectedLocation.description}
                  </span>
                </div>
                <Button
                  className="ml-auto"
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteLocation}
                  size="middle"
                  danger
                />
              </div>
            ) : (
              'No Location Selected'
            )}
          </Form.Item>
          <NestedForm<Location>
            showModal={showLocationModal}
            closeModal={() => setShowLocationModal(false)}
            addObject={handleAddLocation}
            objectData={[selectedLocation ?? {}]}
            formItems={(form) => (
              <AddLocationForm
                parentForm={form}
                existingContacts={existingContacts}
                existingLanguages={existingLanguages}
                existingPhones={existingPhones}
                existingSchedules={existingSchedules}
              />
            )}
            existingObjects={existingLocations}
            existingLabels={['name']}
            formTitle="Add Location"
            parseFields={{}}
            parseObject={{}}
            modalWidth={800}
            attributeClassName="w-2/3"
          />
        </div>
      </>
    );
  }
);

export default AddServiceAtLocationForm;
