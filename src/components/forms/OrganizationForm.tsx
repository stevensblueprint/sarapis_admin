import { useState } from 'react';
import Organization from '../../interface/model/Organization';
import { Button, Form, Input, Modal, Select, Steps, Upload } from 'antd';
import { legalStatusOptions } from '../../data/OrganizationsData';

import { UploadChangeParam } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import CollapsibleFormTable from '../CollapsibleFormTable';
import Location from '../../interface/model/Location';
import { getAllLocations } from '../../api/lib/locations';
import Response from '../../interface/Response';
import { locationTableColumns } from '../../data/LocationData';
import LocationForm from './LocationForm';

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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [form] = Form.useForm();

  useState(() => {
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
  });

  const formSteps = [
    {
      title: 'Basic Information',
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
          <Form.Item
            label="Parent Organization"
            name="parentOrganization"
            rules={[
              {
                required: true,
                message: 'Please input the parent organization!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a parent organization"
              options={organizations.map((organizations) => {
                return { value: organizations.id, label: organizations.name };
              })}
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
            label="Facebook URL"
            name="facebookUrl"
            rules={[
              {
                required: true,
                message: 'Please input the Facebook URL!',
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
            label="Twitter URL"
            name="twitterUrl"
            rules={[
              {
                required: true,
                message: 'Please input the Twitter URL!',
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
            label="Instagram URL"
            name="instagramUrl"
            rules={[
              {
                required: true,
                message: 'Please input the instagram URL!',
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
            label="URI"
            name="uri"
            rules={[
              {
                required: true,
                message: 'Please input the URI!',
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
                message: 'Please input a valid number!',
              },
              {
                min: 1900,
                message: 'Please input a valid year!',
              },
              {
                max: new Date().getFullYear(),
                message: 'Please input a valid year!',
              },
            ]}
          >
            <Input />
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
      title: 'Location Information',
      content: (
        <CollapsibleFormTable
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
    form.resetFields();
    setCurrentStep(0);
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

export default OrganizationForm;
