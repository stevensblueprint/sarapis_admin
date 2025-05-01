import { Table, Form } from 'antd';

const ScheduleForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <Form.Item label="Schedules" name="schedules">
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default ScheduleForm;
