import { useEffect, useState } from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import StatusForm from './StatusForm';
import LanguageForm from './LanguageForm';
import ApplicationForm from './ApplicationForm';
import ScheduleForm from './ScheduleForm';
import LocationForm from './LocationForm';
import ContactForm from './ContactForm';
import { createService } from '../../api/lib/services';
import { Service } from '../../interface/model/Service';
import { ServiceFormObject } from '../../interface/model/ServiceFormObject';

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
  const [formData, setFormData] = useState<ServiceFormObject>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submitModalData, setSubmitModalData] = useState<string>('');

  const steps = [
    {
      title: 'Basic Info',
      content: <BasicInfoForm parentForm={form} />,
    },
    {
      title: 'Additional Info',
      content: <AdditionalInfoForm parentForm={form} />,
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
      title: 'Contact',
      content: <ContactForm form={form} />,
    },
    {
      title: 'Location',
      content: <LocationForm form={form} />,
    },
  ];

  useEffect(() => {
    setShowServiceModal(showModal);
    setCurrentStep(0);
  }, [showModal]);

  const next = async () => {
    const values = await form.validateFields();
    setCurrentStep(currentStep + 1);
    setFormData((prev) => ({ ...prev, ...values }));
    form.setFieldsValue(values);
  };

  const prev = async () => {
    const values = await form.validateFields();
    setCurrentStep(currentStep - 1);
    setFormData((prev) => ({ ...prev, ...values }));
    form.setFieldsValue(values);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const service: Service = {
      ...formData,
      ...values,
      last_modified:
        formData.last_modified?.format('YYYY-MM-DD[T]HH:mm:ss:SSS') ??
        undefined,
      assured_date: formData.assured_date?.format('YYYY-MM-DD') ?? undefined,
      organization: { id: formData.organization!.id },
    };
    try {
      await createService(service);
      setSubmitModalData('Service creation successful!');
      setShowSubmitModal(true);
    } catch (error) {
      setSubmitModalData(`Error creating service: ${error}`);
      setShowSubmitModal(true);
    }
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Are you sure you want to exit?',
      content: 'All entered values will be lost.',
      onOk() {
        closeModal();
        form.resetFields();
        setFormData({});
      },
      onCancel() {},
    });
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
    <div>
      <Modal
        title={steps[currentStep].title}
        open={showServiceModal}
        onCancel={handleCancel}
        footer={modalFooter()}
        centered
        width="70%"
        destroyOnClose
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
      <Modal
        title="Status"
        open={showSubmitModal}
        onCancel={() => setShowSubmitModal(false)}
        footer={null}
      >
        {submitModalData}
      </Modal>
    </div>
  );
};

export default ServiceForm;
