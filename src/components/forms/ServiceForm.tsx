import { useEffect, useState } from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import StepDataArray from '../../interface/model/StepData';
import StatusForm from './StatusForm';

const { Step } = Steps;

const ServiceForm = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [form] = Form.useForm();
  const [stepData, setStepData] = useState<StepDataArray>([]);

  const steps = [
    {
      content: <BasicInfoForm />,
    },
    {
      content: <AdditionalInfoForm />,
    },
    {
      content: <StatusForm />,
    },
  ];

  useEffect(() => {
    setShowServiceModal(showModal);
    setStepData([]);
  }, [showModal]);

  const next = async () => {
    try {
      const values = await form.validateFields();
      setStepData((prev) => ({ ...prev, [currentStep]: values }));
      setCurrentStep(currentStep + 1);
      form.setFieldsValue(stepData[currentStep + 1] || {});
    } catch (err) {
      console.log(err);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
    form.setFieldsValue(stepData[currentStep - 1] || {});
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setStepData((prev) => ({ ...prev, [currentStep]: values }));
      closeModal();
      form.resetFields();
      setCurrentStep(0);
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  const handleCancel = () => {
    setCurrentStep(0);
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
    if (currentStep < 1) {
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
      title="Create Service"
      open={showServiceModal}
      onCancel={handleCancel}
      footer={modalFooter()}
      centered
      width="70%"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Steps current={currentStep} className="mb-6">
          <Step title="Basic Info" />
          <Step title="Additional Info" />
          <Step title="Status" />
        </Steps>

        {steps[currentStep].content}
      </Form>
    </Modal>
  );
};

export default ServiceForm;
