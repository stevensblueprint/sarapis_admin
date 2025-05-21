import { Table, Form, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AddScheduleForm from './nested_forms/AddScheduleForm';
import { useState, useEffect } from 'react';
import Schedule from '../../interface/model/Schedule';
import { ColumnsType } from 'antd/es/table';
import { FormInstance } from 'antd';

const ScheduleForm = ({ form }: { form: FormInstance }) => {
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  const scheduleColumns: ColumnsType = [
    {
      title: 'Opens At',
      dataIndex: 'opens_at',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Closes At',
      dataIndex: 'opens_at',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '60%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Schedule) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteSchedule(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingSchedules = form.getFieldValue('schedules') || [];
    setScheduleData(existingSchedules);
  }, [form]);

  const handleAddSchedule = (schedule: Schedule) => {
    const newSchedules = [...scheduleData, schedule];
    setScheduleData(newSchedules);
    form.setFieldsValue({ schedules: newSchedules });
  };

  const handleDeleteSchedule = (scheduleToDelete: Schedule) => {
    const updatedSchedules = scheduleData.filter(
      (schedule) => schedule !== scheduleToDelete
    );
    setScheduleData(updatedSchedules);
    form.setFieldsValue({ schedules: updatedSchedules });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Schedules</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowScheduleModal(true)}
                size="small"
              />
            </div>
          }
          name="schedules"
        >
          <Table columns={scheduleColumns} dataSource={scheduleData} />
        </Form.Item>
        <AddScheduleForm
          showModal={showScheduleModal}
          closeModal={() => setShowScheduleModal(false)}
          addObject={handleAddSchedule}
          objectData={scheduleData}
        />
      </div>
    </div>
  );
};

export default ScheduleForm;
