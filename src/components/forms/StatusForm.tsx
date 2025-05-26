import { Form, Select, DatePicker, Input, Tooltip } from 'antd';

const StatusForm = () => {
  return (
    <div className="flex flex-row justify-center gap-4">
      <div className="w-1/3 flex flex-col">
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The current status of the service which can be active, inactive, defunct, or temporarily closed."
            >
              Status
            </Tooltip>
          }
          name="status"
          rules={[{ required: true, message: 'Required field!' }]}
        >
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'defunct', label: 'Defunct' },
              { value: 'temporarily_closed', label: 'Temporarily Closed' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The date that the information about the service was last checked."
            >
              Assured Date
            </Tooltip>
          }
          name="assured_date"
        >
          <DatePicker className="w-[100%]" />
        </Form.Item>
        <Form.Item
          className="mt-auto"
          label={
            <Tooltip
              placement="topLeft"
              title="The contact e-mail address for the person or organization which last assured the service."
            >
              Assurer Email
            </Tooltip>
          }
          name="assurer_email"
          rules={[{ type: 'email', message: 'Invalid Email!' }]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="w-1/3">
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The datetime when the service, or any related information about the service, has changed."
            >
              Last Modified
            </Tooltip>
          }
          name="last_modified"
        >
          <DatePicker
            showTime
            className="w-[100%]"
            format={{ format: 'YYYY-MM-DD HH:mm:ss' }}
          />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A description of any short term alerts concerning the service."
            >
              Alerts
            </Tooltip>
          }
          name="alert"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default StatusForm;
