import { Form, type FormProps, Button, Input } from 'antd';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

type FieldType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  verificationCode?: string;
};

const Register = () => {
  const { register, confirmRegistrationAndLogin, resendVerificationCode } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FieldType>({});
  const [emailVerificationStep, setEmailVerificationStep] = useState(false);
  const [resendingCode, setResendingCode] = useState(false);

  const [form] = Form.useForm();

  const registerSubmit: FormProps<FieldType>['onFinish'] = async (
    values: FieldType
  ) => {
    try {
      await register(
        values.email!,
        values.password!,
        values.firstName!,
        values.lastName!
      );
      setFormData(values);
      setEmailVerificationStep(true);
    } catch (error) {
      console.error(error);
    }
  };
  const verifyEmailSubmit: FormProps<FieldType>['onFinish'] = async (
    values: FieldType
  ) => {
    try {
      const session = await confirmRegistrationAndLogin(
        formData.email!,
        formData.password!,
        values.verificationCode!
      );
      if (session && session instanceof CognitoUserSession) {
        navigate('/organizations');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const resendConfirmationCode = async () => {
    setResendingCode(true);
    try {
      await resendVerificationCode(formData.email!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={emailVerificationStep ? verifyEmailSubmit : registerSubmit}
        autoComplete="off"
      >
        {!emailVerificationStep ? (
          <>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: 'Please enter your first name.' },
              ]}
            >
              <Input placeholder="First" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: 'Please enter your last name.' },
              ]}
            >
              <Input placeholder="Last" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email.' },
                { type: 'email', message: 'Please enter a valid email.' },
              ]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password.' },
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="Verification Code"
              name="verificationCode"
              rules={[
                {
                  required: true,
                  message:
                    'Please enter the verification code sent to your email.',
                },
              ]}
            >
              <Input placeholder="123456" />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={resendConfirmationCode}
                disabled={resendingCode}
                block
              >
                Resend Code
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Verify & Log In
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};
export default Register;
