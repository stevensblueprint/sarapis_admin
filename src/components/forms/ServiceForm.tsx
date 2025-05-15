import { useEffect, useState } from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import StepDataArray from '../../interface/model/StepData';
import StatusForm from './StatusForm';
import LanguageForm from './LanguageForm';
import ApplicationForm from './ApplicationForm';
import ScheduleForm from './ScheduleForm';
import LocationForm from './LocationForm';
import ContactForm from './ContactForm';
import Organization from '../../interface/model/Organization';
import { getOrganizationById } from '../../api/lib/organizations';

const { Step } = Steps;

const ServiceForm = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();
  const [stepData, setStepData] = useState<StepDataArray>([]);
  const [organization, setOrganization] = useState<Organization>();

  const steps = [
    {
      title: 'Basic Info',
      content: <BasicInfoForm form={form} />,
    },
    {
      title: 'Additional Info',
      content: <AdditionalInfoForm form={form} organization={organization} />,
    },
    {
      title: 'Status',
      content: <StatusForm />,
    },
    {
      title: 'Language',
      content: <LanguageForm form={form} />,
    },
    {
      title: 'Application',
      content: <ApplicationForm form={form} />,
    },
    {
      title: 'Schedule',
      content: <ScheduleForm form={form} />,
    },
    {
      title: 'Location',
      content: <LocationForm form={form} />,
    },
    {
      title: 'Contact',
      content: <ContactForm form={form} organization={organization} />,
    },
  ];

  useEffect(() => {
    setShowServiceModal(showModal);
    setStepData([]);
    setCurrentStep(0);
  }, [showModal]);

  const next = async () => {
    const values = await form.validateFields();
    if (currentStep == 0 && values.organization) {
      const response = await getOrganizationById(values.organization);
      const data = response.data as Organization;
      setOrganization(data);
    }
    setStepData((prev) => ({ ...prev, [currentStep]: values }));
    setCurrentStep(currentStep + 1);
    form.setFieldsValue(stepData[currentStep + 1] || {});
  };

  const prev = async () => {
    const values = await form.validateFields();
    setStepData((prev) => ({ ...prev, [currentStep]: values }));
    setCurrentStep(currentStep - 1);
    form.setFieldsValue(stepData[currentStep - 1] || {});
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setStepData((prev) => ({ ...prev, [currentStep]: values }));
    closeModal();
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const modalFooter = () => {
    const buttons = [];
    if (currentStep > 0) {
      buttons.push(
        <Button key="back" onClick={prev}>
          Previous
        </Button>
      );
    }
    if (currentStep < steps.length - 1) {
      buttons.push(
        <Button key="next" type="primary" onClick={next}>
          Next
        </Button>
      );
    } else {
      buttons.push(
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Modal
      title={steps[currentStep].title}
      open={showServiceModal}
      onCancel={handleCancel}
      footer={modalFooter()}
      centered
      width="70%"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Steps current={currentStep} className="mb-6">
          <Step />
          <Step />
          <Step />
          <Step />
          <Step />
          <Step />
          <Step />
          <Step />
        </Steps>

        {steps[currentStep].content}
      </Form>
    </Modal>
  );
};

export default ServiceForm;
