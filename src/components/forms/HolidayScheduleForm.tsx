import {
  Button,
  Checkbox,
  DatePicker,
  Table,
  TableProps,
  TimePicker,
} from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface HolidaySchedule {
  key: string;
  startDate: string;
  endDate: string;
  opens: string | null;
  closes: string | null;
  isClosedAllDay: boolean;
  is24hours: boolean;
}

const initialData: HolidaySchedule[] = [
  {
    key: '1',
    startDate: '',
    endDate: '',
    opens: null,
    closes: null,
    isClosedAllDay: false,
    is24hours: false,
  },
];

const HolidayScheduleForm = () => {
  const [schedules, setSchedules] = useState<HolidaySchedule[]>(initialData);
  const handleAdd = () => {
    const newKey = (
      parseInt(schedules[schedules.length - 1].key) + 1
    ).toString();
    setSchedules([
      ...schedules,
      {
        key: newKey,
        startDate: '',
        endDate: '',
        opens: null,
        closes: null,
        isClosedAllDay: false,
        is24hours: false,
      },
    ]);
  };

  const handleDelete = (key: string) => {
    if (schedules.length > 1)
      setSchedules(schedules.filter((schedule) => schedule.key !== key));
  };

  const columns: TableProps<HolidaySchedule>['columns'] = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, record) => (
        <DatePicker
          value={record.startDate}
          onChange={(date) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key ? { ...item, startDate: date } : item
            );
            setSchedules(newSchedules);
          }}
        />
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_, record) => (
        <DatePicker
          value={record.endDate}
          onChange={(date) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key ? { ...item, endDate: date } : item
            );
            setSchedules(newSchedules);
          }}
        />
      ),
    },
    {
      title: 'Opens',
      dataIndex: 'opens',
      render: (_, record) => (
        <TimePicker
          value={record.opens ? dayjs(record.opens, 'HH:mm') : null}
          onChange={(time) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key
                ? { ...item, opens: time ? time.format('HH:mm') : null }
                : item
            );
            setSchedules(newSchedules);
          }}
          disabled={record.isClosedAllDay || record.is24hours}
        />
      ),
    },
    {
      title: 'Closes',
      dataIndex: 'closes',
      key: 'closes',
      render: (_, record) => (
        <TimePicker
          value={record.closes ? dayjs(record.closes, 'HH:mm') : null}
          onChange={(time) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key
                ? { ...item, closes: time ? time.format('HH:mm') : null }
                : item
            );
            setSchedules(newSchedules);
          }}
          disabled={record.isClosedAllDay || record.is24hours}
        />
      ),
    },
    {
      title: 'Closed All Day',
      dataIndex: 'isClosedAllDay',
      key: 'isClosedAllDay',
      render: (_, record) => (
        <Checkbox
          checked={record.isClosedAllDay}
          onChange={(e) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key
                ? { ...item, isClosedAllDay: e.target.checked }
                : item
            );
            setSchedules(newSchedules);
          }}
        />
      ),
    },
    {
      title: '24 Hours',
      dataIndex: 'is24hours',
      key: 'is24hours',
      render: (_, record) => (
        <Checkbox
          checked={record.is24hours}
          onChange={(e) => {
            const newSchedules = schedules.map((item) =>
              item.key === record.key
                ? { ...item, is24hours: e.target.checked }
                : item
            );
            setSchedules(newSchedules);
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          disabled={schedules.length === 1}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
          Add Schedule
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={schedules}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default HolidayScheduleForm;
