import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  DatePicker,
  Select,
  Divider,
} from 'antd';
import Schedule from '../../../interface/model/Schedule';
import { useState } from 'react';

const AddScheduleForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingSchedules,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (schedule: Schedule) => void;
  objectData: Schedule[];
  existingSchedules: Schedule[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [usingInterval, setUsingInterval] = useState<number | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  const isDuplicate = (newSchedule: Schedule) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newSchedule)
    );
  };

  const handleSelect = (jsonValue: string) => {
    const schedule = JSON.parse(jsonValue) as Schedule;
    setSelectedSchedule(schedule);
  };

  const handleClear = () => {
    setSelectedSchedule(null);
  };

  const addNewObject = async () => {
    if (selectedSchedule) {
      if (isDuplicate(selectedSchedule)) {
        showError();
        return;
      }
      addObject(selectedSchedule);
    } else {
      const values = await form.validateFields();
      const newSchedule: Schedule = {
        valid_from: values.valid_dates?.[0]?.format('YYYY-MM-DD') ?? undefined,
        valid_to: values.valid_dates?.[1]?.format('YYYY-MM-DD') ?? undefined,
        dtstart: values.occurrence?.[0]?.format('YYYY-MM-DD') ?? undefined,
        until: values.occurrence?.[1]?.format('YYYY-MM-DD') ?? undefined,
        timezone: values.timezone ? values.timezone : 0,
        freq: values.freq,
        interval: values.interval,
        count: values.count,
        wkst: values.wkst,
        byday: values.byday?.join(',') ?? undefined,
        byweekno: values.byweekno?.join(',') ?? undefined,
        bymonthday: values.bymonthday?.join(',') ?? undefined,
        byyearday: values.byyearday?.join(',') ?? undefined,
        opens_at: values.valid_hours?.[0]?.format('HH:mm') ?? undefined,
        closes_at: values.valid_hours?.[1]?.format('HH:mm') ?? undefined,
        schedule_link: values.schedule_link,
        description: values.description,
        attending_type: values.attending_type,
        notes: values.notes,
      };
      if (isDuplicate(newSchedule)) {
        showError();
        return;
      }
      addObject(newSchedule);
    }
    closeModal();
    form.resetFields();
    setSelectedSchedule(null);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate schedules not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setSelectedSchedule(null);
      }}
      title="Add Schedule"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Schedule</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Schedule"
          options={Array.from(
            new Set(existingSchedules.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Schedule)
            .map((schedule) => ({
              value: JSON.stringify(schedule),
              label: schedule.description,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={
            selectedSchedule ? JSON.stringify(selectedSchedule) : undefined
          }
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Schedule</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedSchedule !== null}
      >
        <Form.Item label="Valid Dates" name="valid_dates">
          <DatePicker.RangePicker className="w-full" format={'YYYY-MM-DD'} />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="Frequency" name="freq">
            <Select
              options={[
                { value: 'WEEKLY', label: 'Weekly' },
                { value: 'MONTHLY', label: 'Monthly' },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item className="w-1/4" label="Interval" name="interval">
            <InputNumber
              onChange={(value: number | null) => setUsingInterval(value)}
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="w-1/4" label="Count" name="count">
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          label="First & Last Occurrence of Event"
          name="occurrence"
          rules={[
            {
              required: usingInterval !== null,
              message: 'Required field when using Interval!',
            },
          ]}
        >
          <DatePicker.RangePicker className="w-full" format={'YYYY-MM-DD'} />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label="Timezone (UTC offset)"
            name="timezone"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item className="w-1/2" label="Week Start" name="wkst">
            <Select
              options={[
                { value: 'MO', label: 'Monday' },
                { value: 'TU', label: 'Tuesday' },
                { value: 'WE', label: 'Wednesday' },
                { value: 'TH', label: 'Thursday' },
                { value: 'FR', label: 'Friday' },
                { value: 'SA', label: 'Saturday' },
                { value: 'SU', label: 'Sunday' },
              ]}
              allowClear
            />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="By Day" name="byday">
            <Select mode="tags" allowClear />
          </Form.Item>
          <Form.Item className="w-1/2" label="By Week Number" name="byweekno">
            <Select mode="tags" allowClear />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item className="w-1/2" label="By Month Day" name="bymonthday">
            <Select mode="tags" allowClear />
          </Form.Item>
          <Form.Item className="w-1/2" label="By Year Day" name="byyearday">
            <Select mode="tags" allowClear />
          </Form.Item>
        </div>
        <Form.Item label="Opening & Closing Hours" name="valid_hours">
          <DatePicker.RangePicker
            className="w-full"
            picker="time"
            format={'HH:mm'}
          />
        </Form.Item>
        <Form.Item
          label="Schedule Link"
          name="schedule_link"
          rules={[
            {
              type: 'url',
              message: 'Invalid URL!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="
        Description"
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label="
        Attending Type"
            name="attending_type"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="
        Notes"
            name="notes"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddScheduleForm;
