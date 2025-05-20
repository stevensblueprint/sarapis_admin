import { Table, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddScheduleForm from './nested_forms/AddScheduleForm';

const ScheduleForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Schedules</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="schedules"
        >
          <Table />
        </Form.Item>
        <AddScheduleForm />
      </div>
    </div>
  );
};

export default ScheduleForm;
