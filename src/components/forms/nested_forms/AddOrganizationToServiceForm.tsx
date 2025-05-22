import { Modal, Button, Form, Input, Select, Divider } from 'antd';
import { useState } from 'react';
import Organization from '../../../interface/model/Organization';

const AddOrganizationToServiceForm = ({
  showModal,
  closeModal,
  addObject,
  existingOrganizations,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (organization: Organization) => void;
  existingOrganizations: Organization[];
}) => {
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const addNewObject = async () => {
    if (selectedOrganization) {
      addObject(selectedOrganization);
      closeModal();
      setSelectedOrganization(null);
    }
  };

  const handleSelect = (jsonValue: string) => {
    const organization = JSON.parse(jsonValue) as Organization;
    setSelectedOrganization(organization);
  };

  const handleClear = () => {
    setSelectedOrganization(null);
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        setSelectedOrganization(null);
      }}
      title="Add Organization"
      footer={
        <Button
          type="primary"
          onClick={addNewObject}
          disabled={selectedOrganization === null}
        >
          Add
        </Button>
      }
    >
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Organization</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select an Organization"
          options={existingOrganizations.map((organization) => ({
            value: JSON.stringify(organization),
            label: `${organization.name} - ${organization.description}`,
          }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={
            selectedOrganization
              ? JSON.stringify(selectedOrganization)
              : undefined
          }
        />
      </div>
    </Modal>
  );
};

export default AddOrganizationToServiceForm;
