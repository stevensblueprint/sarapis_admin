import { useEffect, useState } from 'react';
import { getAllServices, getTextSearchServices } from '../api/lib/services';
import type { CascaderProps, AutoCompleteProps, TableProps } from 'antd';
import {
  Cascader,
  Dropdown,
  Space,
  AutoComplete,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Steps,
  Table,
} from 'antd';
import {
  ShareAltOutlined,
  DownloadOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  Option,
  typesOfServicesOptions,
  sortByOptions,
  resulsPerPageOptions,
  items,
  ProgramTableDataType,
} from '../data/HomeData';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import Map from '../components/Map';
import { Service } from '../interface/model/Service';
import Navbar from '../components/Navbar';
import Response from '../interface/Response';
import EmptyData from '../components/EmptyData';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllServices();
        const data = response.data as Response<Service[]>;
        setServices((prev) => [...prev, ...data.contents]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
  }, [services]);

  const onChangeTypesOfService: CascaderProps<
    Option,
    'value',
    true
  >['onChange'] = (value) => {
    console.log(value);
    console.log(searchText);
  };

  const programTableColumns: TableProps<ProgramTableDataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link
          to={`/services/${record.id}`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Alternate Name',
      dataIndex: 'alternateName',
      key: 'alternateName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <a>Delete</a> {/* TODO: Handle Delete */}
        </Space>
      ),
    },
  ];

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
              options={[{ value: '1', label: 'Organization' }]}
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
        <div>
          <Table columns={programTableColumns} pagination={{ pageSize: 5 }} />{' '}
          {/* TODO: Add dataSource */}
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

  const onChangeSortBy: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const onChangeResultsPerPage: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const getPanelValue = async (searchText: string) => {
    const response = await getTextSearchServices(searchText);
    setOptions(
      response.data.map((service: Service) => ({ value: service.name }))
    );
  };

  const onSelectSearch = (data: string) => setSearchText(data);

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-evenly gap-10 p-5">
        <AutoComplete
          options={options}
          onSelect={onSelectSearch}
          onSearch={(text) => getPanelValue(text)}
          placeholder="Search for Services"
          className="h-12 w-80"
        />
        <AutoComplete
          options={options}
          onSelect={onSelectSearch}
          onSearch={(text) => getPanelValue(text)}
          placeholder="Search for Location"
          className="h-12 w-80"
        />
        <Button type="primary" className="h-12">
          Search
        </Button>
      </div>
      <div className="flex flex-row p-8">
        <div className="basis-1/2 flex flex-row gap-4 justify-start">
          <Cascader
            options={typesOfServicesOptions}
            onChange={onChangeTypesOfService}
            multiple
            placeholder="Types of Services"
          />
          <Cascader
            options={sortByOptions}
            onChange={onChangeSortBy}
            placeholder="Sort By"
            className="h-10"
          />
          <Cascader
            options={resulsPerPageOptions}
            onChange={onChangeResultsPerPage}
            placeholder="Results Per Page"
            className="h-10"
          />
          <Button
            type="primary"
            className="h-12"
            onClick={showShowServiceModal}
          >
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
        <div className="basis-1/2 flex flex-row justify-end gap-4">
          <div className="flex flex-row justify-center items-center gap-2">
            <ShareAltOutlined style={{ fontSize: '18px' }} />
            <p className="text-lg">Share</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <DownloadOutlined style={{ fontSize: '18px' }} />
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <p className="text-lg">Download</p>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-2/3">
          {services.length > 0 ? (
            services.map((service) => {
              return <ServiceCard key={service.id} service={service} />;
            })
          ) : (
            <EmptyData text="No services found" />
          )}
        </div>
        <div className="basis-1/3 grow-0">
          <Map />
        </div>
      </div>
      <div className="flex flex-row justify-start p-10">
        <p>Showing 1 to 10 of 100 entries</p>
      </div>
    </>
  );
};

export default Services;
