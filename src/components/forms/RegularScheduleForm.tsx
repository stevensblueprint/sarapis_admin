import {
  Checkbox,
  Form,
  FormInstance,
  Table,
  TableProps,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface DaySchedule {
  key: string;
  day: string;
  opens: string | null;
  closes: string | null;
  isClosedAllDay: boolean;
  is24hours: boolean;
}

interface HandleTimeChangeParams {
  time: string | null;
  day: string;
  field: 'opens' | 'closes';
}

interface HandleCheckBoxChangeParams {
  checked: boolean;
  day: string;
  field: 'isClosedAllDay' | 'is24hours';
}

const initialData: DaySchedule[] = daysOfWeek.map((day) => ({
  key: day.toLowerCase(),
  day,
  opens: null,
  closes: null,
  isClosedAllDay: false,
  is24hours: false,
}));

interface RegularScheduleFormProps {
  parentForm: FormInstance;
}

const RegularScheduleForm = ({ parentForm }: RegularScheduleFormProps) => {
  const [data, setData] = useState<DaySchedule[]>(initialData);
  const [form] = Form.useForm();

  const handleTimeChange = ({ time, day, field }: HandleTimeChangeParams) => {
    setData((prev) =>
      prev.map((d) => {
        if (d.day === day) {
          return { ...d, [field]: time };
        }
        return d;
      })
    );
  };

  const handleCheckboxChange = ({
    checked,
    day,
    field,
  }: HandleCheckBoxChangeParams) => {
    parentForm.setFieldValue('regularSchedule', data);
    setData((prev) =>
      prev.map((item) => {
        if (item.day === day) {
          const newItem = { ...item, [field]: checked };
          if (field === 'isClosedAllDay' && checked) {
            newItem.opens = null;
            newItem.closes = null;
            newItem.is24hours = false;
          }
          if (field === 'is24hours' && checked) {
            newItem.opens = '00:00';
            newItem.closes = '23:59';
            newItem.isClosedAllDay = false;
          }
          return newItem;
        }
        return item;
      })
    );
  };

  const columns: TableProps<DaySchedule>['columns'] = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      width: '15%',
    },
    {
      title: 'Opens',
      dataIndex: 'opens',
      key: 'opens',
      width: '20%',
      render: (_, record) => (
        <TimePicker
          value={record.opens ? dayjs(record.opens, 'HH:mm') : null}
          disabled={record.isClosedAllDay || record.is24hours}
          format="HH:mm"
          defaultValue={dayjs('15:00', 'HH:mm')}
          needConfirm
          onChange={(time) =>
            handleTimeChange({
              time: time ? time.format('HH:mm') : null,
              day: record.day,
              field: 'opens',
            })
          }
        />
      ),
    },
    {
      title: 'Closes',
      dataIndex: 'closes',
      key: 'closes',
      width: '20%',
      render: (_, record) => (
        <TimePicker
          value={record.closes ? dayjs(record.closes, 'HH:mm') : null}
          disabled={record.isClosedAllDay || record.is24hours}
          format="HH:mm"
          defaultValue={dayjs('15:00', 'HH:mm')}
          needConfirm
          onChange={(time) =>
            handleTimeChange({
              time: time ? time.format('HH:mm') : null,
              day: record.day,
              field: 'closes',
            })
          }
        />
      ),
    },
    {
      title: 'Closed All Day',
      dataIndex: 'isClosedAllDay',
      key: 'isClosedAllDay',
      width: '20%',
      render: (_, record) => (
        <Form.Item
          name={`isClosedAllDay_${record.key}`}
          valuePropName="checked"
          noStyle
        >
          <Checkbox
            checked={record.isClosedAllDay}
            onChange={(e) => {
              e.stopPropagation();
              handleCheckboxChange({
                checked: e.target.checked,
                day: record.day,
                field: 'isClosedAllDay',
              });
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: '24 Hours',
      dataIndex: 'is24hours',
      key: 'is24hours',
      width: '20%',
      render: (_, record) => (
        <Form.Item
          name={`is24hours_${record.key}`}
          valuePropName="checked"
          noStyle
        >
          <Checkbox
            checked={record.is24hours}
            onChange={(e) => {
              e.stopPropagation();
              handleCheckboxChange({
                checked: e.target.checked,
                day: record.day,
                field: 'is24hours',
              });
            }}
          />
        </Form.Item>
      ),
    },
  ];
  return (
    <Form form={form}>
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </Form>
  );
};

export default RegularScheduleForm;
