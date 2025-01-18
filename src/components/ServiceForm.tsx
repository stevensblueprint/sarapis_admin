import { useState } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Steps,
  Table,
  TableProps,
} from 'antd';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';
import { ProgramTableDataType } from '../data/HomeData';

const ServiceForm = () => {
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [form] = Form.useForm();
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
          <Collapse
            bordered={true}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            items={[
              { key: '1', label: 'Add a new program', children: <div> </div> },
              {
                key: '2',
                label: 'Add an existing program',
                children: <div> </div>,
              },
            ]}
          />
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
