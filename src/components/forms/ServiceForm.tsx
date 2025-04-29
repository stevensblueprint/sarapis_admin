import { useEffect, useState } from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import BasicForm from './BasicForm';

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
  const [stepData, setStepData] = useState({
    step0: {},
    step1: {},
  });
  const [form] = Form.useForm();

  useEffect(() => {
    setShowServiceModal(showModal);
  }, [showModal]);

  const formSteps = [
    {
      title: 'Basic',
      content: <BasicForm />,
    },
    {
      title: 'Basic2',
      content: <BasicForm />,
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

  const handleCancel = () => {
    setShowServiceModal(false);
    setCurrentStep(0);
    closeModal();
  };

  const onFinish = () => {};

  return (
    <Modal
      title={formSteps[currentStep].title}
      open={showServiceModal}
      onCancel={handleCancel}
      footer={modalFooter()}
      centered
      width={'80%'}
    >
      <div>
        <Form
          className="flex flex-col align-center gap-10"
          form={form}
          layout="vertical"
          initialValues={stepData['step0'] || {}}
        >
          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            {formSteps.map((s) => (
              <Step key={s.title} title={s.title} />
            ))}
          </Steps>

          {formSteps[currentStep].content}

          <div style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button onClick={prev} style={{ marginRight: 8 }}>
                Previous
              </Button>
            )}
            {currentStep < formSteps.length - 1 ? (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={onFinish}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ServiceForm;
