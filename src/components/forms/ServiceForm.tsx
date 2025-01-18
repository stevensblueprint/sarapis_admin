import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Steps } from 'antd';
import Response from '../../interface/Response';
import Organization from '../../interface/model/Organization';
import { getAllOrganizations } from '../../api/lib/organizations';
import ProgramForm from './ProgramForm';
import Program from '../../interface/model/Program';
import { getAllPrograms } from '../../api/lib/programs';
import { programTableColumns } from '../../data/ServicesData';
import CollapsibleFormSelectTable from '../CollapsibleFormSelectTable';
import RequiredDocument from '../../interface/model/RequiredDocument';
import CollapsibleFormTable from '../CollapsibleFormTable';
import RequiredDocumentForm from './RequiredDocumentsForm';
import { requiredDocumentsTableColumns } from '../../data/RequiredDocumentsData';
import Phone from '../../interface/model/Phone';
import Contact from '../../interface/model/Contact';
import LocationForm from './LocationForm';
import { locationTableColumns } from '../../data/LocationData';
import PhoneForm from './PhoneForm';
import { phoneTableColumns } from '../../data/PhoneData';
import ContactForm from './ContactForm';
import { contactTableColumns } from '../../data/ContactData';
import Location from '../../interface/model/Location';
import RegularScheduleForm from './RegularScheduleForm';

const ServiceForm = () => {
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(8);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [requiredDocuments, setRequiredDocuments] = useState<
    RequiredDocument[]
  >([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllPrograms();
        const data = response.data as Response<Program[]>;
        data.contents?.forEach((program) => {
          setPrograms((prev) => [...prev, program]);
        });
        setPrograms(data.contents || []);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchOrganizations = async () => {
      try {
        const response = await getAllOrganizations();
        const data = response.data as Response<Organization[]>;
        setOrganizations(data.contents || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrograms();
    fetchOrganizations();
  }, []);

  const formSteps = [
    {
      title: 'Basic Information',
      content: (
        <Form form={form} variant="filled">
          <Form.Item
            label="Service Name"
            name="Service Name"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Organization Name"
            name="Organization Name"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Select
              showSearch
              placeholder="Select an Organization"
              options={organizations.map((organization) => {
                return { value: organization.id, label: organization.name };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Service Description"
            name="Service Description"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Service URL (website)"
            name="Service URL"
            rules={[
              { required: true },
              { type: 'url', warningOnly: true },
              { type: 'string', min: 6 },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Service Email"
            name="Service Email"
            rules={[
              { required: true },
              { type: 'email', warningOnly: true },
              { type: 'string', min: 6 },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Service Area"
            name="Service Area"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Select />
          </Form.Item>
          <Form.Item
            label="Service Alternate Name"
            name="Service Alternate Name"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Accreditations"
            name="Accreditations"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Funding"
            name="Funding"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Language Information',
      content: (
        <Form form={form} variant="filled">
          <Form.Item
            label="Languages"
            name="languages"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Select
              mode="multiple"
              options={[{ value: '1', label: 'English' }]}
            />
          </Form.Item>
          <Form.Item
            label="Interpretation Services"
            name="Interpretation Services"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Service Alert"
            name="Service Alert"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Application Information',
      content: (
        <Form form={form} variant="filled">
          <Form.Item
            label="Application Process"
            name="Application Process"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Fee Description"
            name="Fee Description"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Eligibility Description"
            name="Eligibility Description"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Eligibility Requirement"
            name="Eligibility Requirement"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Select
              options={[
                { value: '1', label: 'None' },
                { value: '2', label: 'Yes' },
              ]}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Program Information',
      content: (
        <CollapsibleFormSelectTable
          formLabel="Add a new Program"
          customForm={
            <ProgramForm parentForm={form} setPrograms={setPrograms} />
          }
          parentForm={form}
          selectLabel="Add an existing Program"
          dropdownLabel="Program Name"
          dropdownName="Program Name"
          dropdownPlaceholder="Select a Program"
          emptyText="Programs"
          options={programs.map((program) => {
            return { value: program.id, label: program.name };
          })}
          tableColumns={programTableColumns || []}
          dataSource={programs}
        />
      ),
    },
    {
      title: 'Required Documents',
      content: (
        <CollapsibleFormTable
          formLabel="Add a new Required Document"
          customForm={
            <RequiredDocumentForm
              parentForm={form}
              setRequiredDocument={setRequiredDocuments}
            />
          }
          emptyText="Required Documents"
          tableColumns={requiredDocumentsTableColumns || []}
          dataSource={requiredDocuments}
        />
      ),
    },
    {
      title: 'Location Information',
      content: (
        <CollapsibleFormSelectTable
          formLabel="Add a new Location"
          selectLabel="Select an existing Location"
          customForm={
            <LocationForm parentForm={form} setLocations={setLocations} />
          }
          parentForm={form}
          dropdownLabel="Location Name"
          dropdownName="location Name"
          dropdownPlaceholder="Select a Location"
          emptyText="Locations"
          options={locations.map((location) => {
            return { value: location.id, label: location.name };
          })}
          tableColumns={locationTableColumns || []}
          dataSource={locations}
        />
      ),
    },
    {
      title: 'Phone Information',
      content: (
        <CollapsibleFormSelectTable
          formLabel="Add a new Phone"
          selectLabel="Select an existing Phone"
          customForm={<PhoneForm parentForm={form} setPhones={setPhones} />}
          parentForm={form}
          dropdownLabel="Phone Number"
          dropdownName="Phone Number"
          dropdownPlaceholder="Select a Phone"
          emptyText="Phones"
          options={phones.map((phone) => {
            return { value: phone.id, label: phone.number };
          })}
          tableColumns={phoneTableColumns || []}
          dataSource={phones}
        />
      ),
    },
    {
      title: 'Contact Information',
      content: (
        <CollapsibleFormSelectTable
          formLabel="Add a new Contact"
          selectLabel="Select an existing Contact"
          customForm={
            <ContactForm parentForm={form} setContacts={setContacts} />
          }
          parentForm={form}
          dropdownLabel="Contact Name"
          dropdownName="Contact Name"
          dropdownPlaceholder="Select a Contact"
          emptyText="Contacts"
          options={contacts.map((contact) => {
            return { value: contact.id, label: contact.name };
          })}
          tableColumns={contactTableColumns || []}
          dataSource={contacts}
        />
      ),
    },
    {
      title: 'Schedule Information',
      content: (
        <div>
          <RegularScheduleForm />
        </div>
      ),
    },
  ];

  const next = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      setShowServiceModal(false);
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      console.error(error);
    }
  };

  const modalFooter = () => {
    const items = [];
    if (currentStep > 0) {
      items.push(
        <Button key="back" onClick={prev}>
          Previous
        </Button>
      );
    }
    items.push(
      <Button key="cancel" onClick={handleCancel}>
        Cancel
      </Button>
    );
    if (currentStep < formSteps.length - 1) {
      items.push(
        <Button key="next" type="primary" onClick={next}>
          Next
        </Button>
      );
    } else {
      items.push(
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      );
    }
    return items;
  };

  const showShowServiceModal = () => setShowServiceModal(true);
  const handleCancel = () => {
    setShowServiceModal(false);
    form.resetFields();
    setCurrentStep(0);
  };
  return (
    <div>
      <Button type="primary" className="h-12" onClick={showShowServiceModal}>
        Add Service
      </Button>
      <Modal
        title={formSteps[currentStep].title}
        open={showServiceModal}
        onCancel={handleCancel}
        footer={modalFooter()}
        width={800}
      >
        <div className="mb-8">
          <Steps
            current={currentStep}
            items={formSteps.map((step) => ({ title: step.title }))}
          />
        </div>
        <div>{formSteps[currentStep].content}</div>
      </Modal>
    </div>
  );
};

export default ServiceForm;
