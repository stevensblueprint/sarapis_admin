import { Form, type FormProps, Input, Button, Flex, Checkbox } from 'antd';
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

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
        navigate('/services');
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
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 500 }}
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
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/reset-password">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
