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
  Tooltip,
} from 'antd';
import Schedule from '../../../interface/model/Schedule';
import { useState } from 'react';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';

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
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newSchedule: Schedule) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newSchedule)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
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
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The dates when the schedule is valid."
            >
              Valid Dates
            </Tooltip>
          }
          name="valid_dates"
        >
          <DatePicker.RangePicker className="w-full" format={'YYYY-MM-DD'} />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - How often the frequency repeats."
              >
                Frequency
              </Tooltip>
            }
            name="freq"
          >
            <Select
              options={[
                { value: 'WEEKLY', label: 'Weekly' },
                { value: 'MONTHLY', label: 'Monthly' },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item
            className="w-1/4"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - How often the frequency repeats. For example, and Interval of 2 for a WEEKLY Frequency would represent fortnightly."
              >
                Interval
              </Tooltip>
            }
            name="interval"
          >
            <InputNumber
              onChange={(value: number | null) => setUsingInterval(value)}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            className="w-1/4"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - The number of times that the event occurs. Use this instead of 'until', if appropriate."
              >
                Count
              </Tooltip>
            }
            name="count"
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The date of the first and last occurrence of the event. Necessary when using the 'interval' feature, optional otherwise."
            >
              First & Last Occurrence of Event
            </Tooltip>
          }
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
            label={
              <Tooltip
                placement="topLeft"
                title="The timezone that all dates are expressed as, expressed as a UTC offset. Dates are assumed to be UTC otherwise."
              >
                Timezone (UTC Offset)
              </Tooltip>
            }
            name="timezone"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - The day on which the week starts."
              >
                Week Start
              </Tooltip>
            }
            name="wkst"
          >
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
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - Comma separated days of the week. Where freq is MONTHLY each part can be preceded by a positive or negative integer to represent which occurrence in a month; e.g. 2MO is the second Monday in a month. -1FR is the last Friday"
              >
                By Day
              </Tooltip>
            }
            name="byday"
          >
            <Select mode="tags" allowClear />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - Comma separated numeric weeks of the year, where freq is WEEKLY. Can be negative to represent weeks before the end of the year; e.g. -5 is the 5th to last week in a year."
              >
                By Week Number
              </Tooltip>
            }
            name="byweekno"
          >
            <Select mode="tags" allowClear />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - Comma separated numeric days of the month, where frequency is MONTHLY. Can be negative to represent days before the end of the month; e.g. -5 is the 5th to last day in a month."
              >
                By Month Day
              </Tooltip>
            }
            name="bymonthday"
          >
            <Select mode="tags" allowClear />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="iCal - Comma separated numeric days of the month, where frequency is YEARLY. Can be negative to represent days before the end of the year; e.g. -1 is the last day in a year."
              >
                By Year Day
              </Tooltip>
            }
            name="byyearday"
          >
            <Select mode="tags" allowClear />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The time when the service or location opens and closes."
            >
              Opening & Closing Hours
            </Tooltip>
          }
          name="valid_hours"
        >
          <DatePicker.RangePicker
            className="w-full"
            picker="time"
            format={'HH:mm'}
          />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="URL of a link for the schedule which may show each individual session and may provide a booking facility."
            >
              Schedule Link
            </Tooltip>
          }
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
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of the availability of the service."
            >
              Description
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of how to attend this service."
              >
                Attending Type
              </Tooltip>
            }
            name="attending_type"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="Free text notes on the schedule."
              >
                Notes
              </Tooltip>
            }
            name="notes"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2">
              <Tooltip
                placement="topLeft"
                title="A link between a service and one or more classifications that describe the nature of the service provided."
              >
                Attributes
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowAttributeModal(true)}
                size="small"
              />
            </div>
          }
          name="attributes"
        >
          <Select mode="multiple" allowClear />
        </Form.Item>
        <AddAttributeForm
          showModal={showAttributeModal}
          closeModal={() => setShowAttributeModal(false)}
          addObject={handleAddAttribute}
          objectData={attributeData}
        />
      </Form>
    </Modal>
  );
};

export default AddScheduleForm;
