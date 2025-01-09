import { Form, type FormProps, Input, Button } from 'antd';
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType
  ) => {
    try {
      const result = await login(values.email!, values.password!);
      if (result && result instanceof CognitoUserSession) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Please input a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters long!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
