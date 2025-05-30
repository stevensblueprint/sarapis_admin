import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';
import { useState, useEffect } from 'react';
import ServiceArea from '../../interface/model/ServiceArea';
import {
  serviceAreaColumns,
  serviceAtLocationColumns,
} from '../../data/FormTableColumns';
import AddServiceAreaForm from './nested_forms/AddServiceAreaForm';
import AddServiceAtLocationForm from './nested_forms/AddServiceAtLocationForm';
import ServiceAtLocation from '../../interface/model/ServiceAtLocation';
import DisplayTable from './DisplayTable';
import Contact from '../../interface/model/Contact';
import Phone from '../../interface/model/Phone';
import Language from '../../interface/model/Language';
import Schedule from '../../interface/model/Schedule';

interface LocationFormProps {
  parentForm: FormInstance;
}

const LocationForm = ({ parentForm }: LocationFormProps) => {
  const [organization, setOrganization] = useState<Organization | undefined>();
  const [existingContacts, setExistingContacts] = useState<Contact[]>([]);
  const [existingPhones, setExistingPhones] = useState<Phone[]>([]);
  const [existingLanguages, setExistingLanguages] = useState<Language[]>([]);
  const [existingSchedules, setExistingSchedules] = useState<Schedule[]>([]);
  const [existingServiceAreas, setExistingServiceAreas] = useState<
    ServiceArea[]
  >([]);

  useEffect(() => {
    setExistingContacts(parentForm.getFieldValue('contacts') ?? []);
    setExistingLanguages(parentForm.getFieldValue('languages') ?? []);
    setExistingPhones(parentForm.getFieldValue('phones') ?? []);
    setExistingSchedules(parentForm.getFieldValue('schedules') ?? []);
    setExistingServiceAreas(parentForm.getFieldValue('service_areas') ?? []);
  }, [parentForm]);

  useEffect(() => {
    setOrganization(parentForm.getFieldValue('organization') ?? undefined);
  }, [parentForm]);

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <DisplayTable<ServiceArea>
          columns={serviceAreaColumns}
          parentForm={parentForm}
          fieldLabel="service_areas"
          tooltipTitle="The details of the geographic area for which a service is available."
          formLabel="Service Areas"
          updateParentObject={(objects: ServiceArea[]) =>
            setExistingServiceAreas(objects)
          }
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Service Area',
            formItems: () => <AddServiceAreaForm />,
            parseFields: {},
            parseObject: {},
          }}
        />
        <DisplayTable<ServiceAtLocation>
          columns={serviceAtLocationColumns}
          parentForm={parentForm}
          fieldLabel="service_at_locations"
          tooltipTitle="A link between a service and a specific location."
          formLabel="Service At Locations"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Service At Location',
            formItems: (form) => (
              <AddServiceAtLocationForm
                parentForm={form}
                existingServiceAreas={existingServiceAreas}
                existingContacts={[
                  ...(organization?.contacts ?? []),
                  ...existingContacts,
                ]}
                existingLanguages={existingLanguages}
                existingPhones={[
                  ...(organization?.phones ?? []),
                  ...existingPhones,
                ]}
                existingSchedules={existingSchedules}
                existingLocations={organization?.locations ?? []}
              />
            ),
            parseFields: {},
            parseObject: {},
            modalWidth: 800,
            attributeClassName: 'w-2/3',
          }}
        />
      </div>
    </div>
  );
};

export default LocationForm;
