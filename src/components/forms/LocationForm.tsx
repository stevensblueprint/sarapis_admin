import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';
import { useState, useEffect } from 'react';
import ServiceArea from '../../interface/model/ServiceArea';
import { ColumnsType } from 'antd/es/table';
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
  existingServiceAreas: ServiceArea[];
  existingContacts: Contact[];
  existingPhones: Phone[];
  existingLanguages: Language[];
  existingSchedules: Schedule[];
}

const LocationForm = ({
  parentForm,
  existingContacts,
  existingLanguages,
  existingPhones,
  existingSchedules,
  existingServiceAreas,
}: LocationFormProps) => {
  const [organization, setOrganization] = useState<Organization | undefined>();

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

  const serviceAtLocationColumns: ColumnsType = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: '90%',
      ellipsis: true,
    },
  ];

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
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Service Area',
            formItems: (_, ref) => <AddServiceAreaForm ref={ref} />,
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
            formItems: (form, ref) => (
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
                ref={ref}
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
