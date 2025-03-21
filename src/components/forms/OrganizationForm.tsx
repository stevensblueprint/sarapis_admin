import { useState, useEffect } from 'react';
import Organization from '../../interface/model/Organization';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Steps,
  Upload,
} from 'antd';
import { legalStatusOptions } from '../../data/OrganizationsData';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import CollapsibleFormSelectTable from '../CollapsibleFormSelectTable';
import Location from '../../interface/model/Location';
import { getAllLocations } from '../../api/lib/locations';
import Response from '../../interface/Response';
import { locationTableColumns } from '../../data/LocationData';
import LocationForm from './LocationForm';
import PhoneForm from './PhoneForm';
import Phone from '../../interface/model/Phone';
import { phoneTableColumns } from '../../data/PhoneData';
import ContactForm from './ContactForm';
import Contact from '../../interface/model/Contact';
import { contactTableColumns } from '../../data/ContactData';
import RegularScheduleForm from './RegularScheduleForm';
import HolidayScheduleForm from './HolidayScheduleForm';

const normFile = (e: UploadChangeParam) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface OrganizationFormProps {
  organizations: Organization[];
}

const OrganizationForm = ({ organizations }: OrganizationFormProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [locations, setLocations] = useState<Location[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const response = await getAllLocations();
        const data = response.data as Response<Location[]>;
        setLocations(data.contents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllLocations();
  }, []);

  const formSteps = [
    {
      title: 'Basic',
      content: (
        <Form form={form} variant="filled">
          <Form.Item
            label="Organization Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the organization name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Parent Organization" name="parentOrganization">
            <Select
              showSearch
              placeholder="Select a parent organization"
              options={organizations.map((org) => ({
                value: org.id,
                label: org.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input the description!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the email!',
              },
              {
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[
              {
                required: true,
                message: 'Please input the URL!',
              },
              {
                type: 'url',
                message: 'Please input a valid URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Year Incorporated"
            name="yearIncorporated"
            rules={[
              {
                required: true,
                message: 'Please input the year incorporated!',
              },
              {
                type: 'number',
                min: 1900,
                max: new Date().getFullYear(),
                message: 'Please input a valid year!',
              },
            ]}
          >
            <InputNumber min={1900} max={new Date().getFullYear()} />
          </Form.Item>
          <Form.Item
            label="Legal Status"
            name="legalStatus"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              options={legalStatusOptions}
              placeholder="Select Legal Status"
            />
          </Form.Item>
          <Form.Item
            label="Alternate Name"
            name="alternateName"
            rules={[
              {
                required: true,
                message: 'Please input the alternate name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Funding"
            name="funding"
            rules={[
              {
                required: true,
                message: 'Please input the funding!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Logo"
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Logo URL"
            name="logoUrl"
            rules={[
              {
                type: 'url',
                message: 'Please input a valid URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Location',
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
          options={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          tableColumns={locationTableColumns || []}
          setter={setLocations}
          data={locations.filter(
            (location) => location.organizationId === form.getFieldValue('id')
          )}
        />
      ),
    },
    {
      title: 'Phone',
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
          options={phones.map((phone) => ({
            value: phone.id,
            label: phone.number,
          }))}
          tableColumns={phoneTableColumns || []}
          setter={setPhones}
          data={phones}
        />
      ),
    },
    {
      title: 'Contact',
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
          options={contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
          }))}
          tableColumns={contactTableColumns || []}
          setter={setContacts}
          data={contacts}
        />
      ),
    },
    {
      title: 'Schedule',
      content: (
        <div>
          <RegularScheduleForm parentForm={form} />
          <HolidayScheduleForm />
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
      setShowModal(false);
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const modalFooter = () => {
    const items = [];
    if (currentStep > 0) {
      items.push(
        <Button key="back" onClick={prev}>
          Back
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

  return (
    <div>
      <Button
        type="primary"
        className="h-12"
        onClick={() => setShowModal(true)}
      >
        Add Organization
      </Button>
      <Modal
        title={formSteps[currentStep].title}
        open={showModal}
        onCancel={handleCancel}
        destroyOnClose
        afterClose={() => {
          form.resetFields();
          setContacts([]);
          setPhones([]);
          setLocations([]);
          setCurrentStep(0);
        }}
        footer={modalFooter()}
        centered
        width={'80%'}
      >
        <div className="mb-8">
          <Steps
            current={currentStep}
            items={formSteps.map((step) => ({ title: step.title }))}
          />
        </div>
        <div className="flex flex-row justify-center">
          {formSteps[currentStep].content}
        </div>
      </Modal>
    </div>
  );
};

export default OrganizationForm;
