import { Form, Select, DatePicker, Input } from 'antd';

const StatusForm = () => {
  return (
    <div className="flex flex-row justify-center gap-4">
      <div className="w-1/3 flex flex-col">
        <Form.Item
          label="Status"
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
        <Form.Item label="Assured Date" name="assured_date">
          <DatePicker className="w-[100%]" />
        </Form.Item>
        <Form.Item
          className="mt-auto"
          label="Assurer Email"
          name="assurer_email"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="w-1/3">
        <Form.Item label="Last Modified" name="last_modified">
          <DatePicker
            showTime
            className="w-[100%]"
            format={{ format: 'YYYY-MM-DD HH:mm:ss' }}
          />
        </Form.Item>
        <Form.Item label="Alerts" name="alert">
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </div>
  );
};

export default StatusForm;
