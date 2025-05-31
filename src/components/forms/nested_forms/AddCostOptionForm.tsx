import { Form, Tooltip, Input, DatePicker, InputNumber } from 'antd';
import { JSX } from 'react';

const AddCostOptionForm = (): JSX.Element => {
  return (
    <>
      <Form.Item
        label={
          <Tooltip
            placement="topLeft"
            title="The dates when the price is valid."
          >
            Valid Dates
          </Tooltip>
        }
        name="valid_dates"
      >
        <DatePicker.RangePicker className="w-full" />
      </Form.Item>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-full"
          label={
            <Tooltip
              placement="topLeft"
              title="The 3 letter currency code of this cost option (expected to be gbp by Open Referral UK)."
            >
              Currency
            </Tooltip>
          }
          name="currency"
        >
          <Input placeholder="gbp, usd, etc" />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The cost of the option, expressed as an amount."
            >
              Amount
            </Tooltip>
          }
          name="amount"
        >
          <InputNumber />
        </Form.Item>
      </div>
      <div className="flex flex-row gap-2">
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="Conditions associated with the cost option."
            >
              Option
            </Tooltip>
          }
          name="option"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label={
            <Tooltip
              placement="topLeft"
              title="Specific details qualifying the cost amount."
            >
              Description
            </Tooltip>
          }
          name="amount_description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </div>
    </>
  );
};

export default AddCostOptionForm;
