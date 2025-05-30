import { Form, Tooltip, Input, Select, InputNumber, FormInstance } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { JSX, forwardRef, useImperativeHandle } from 'react';
import DisplayTable from '../DisplayTable';
import Language from '../../../interface/model/Language';
import AddLanguageForm from './AddLanguageForm';

interface AddPhoneFormProps {
  parentForm: FormInstance;
  existingLanguages: Language[];
}

const AddPhoneForm = forwardRef(
  ({ parentForm, existingLanguages }: AddPhoneFormProps, ref): JSX.Element => {
    useImperativeHandle(ref, () => ({
      resetState: () => {},
    }));

    const languageColumns: ColumnsType = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
        ellipsis: true,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: '60%',
        ellipsis: true,
      },
    ];

    return (
      <>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-5/12"
            label={
              <Tooltip placement="topLeft" title="The phone number.">
                Number
              </Tooltip>
            }
            name="number"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/4"
            label={
              <Tooltip
                placement="topLeft"
                title="The extension of the phone number."
              >
                Extension
              </Tooltip>
            }
            name="extension"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            className="w-1/3"
            label={
              <Tooltip
                placement="topLeft"
                title="Indicates the type of phone service."
              >
                Type
              </Tooltip>
            }
            name="type"
          >
            <Select
              options={[
                { value: 'text (for SMS)', label: 'Text (for SMS)' },
                { value: 'voice', label: 'Voice' },
                { value: 'fax', label: 'Fax' },
                { value: 'cell', label: 'Cell' },
                { value: 'video', label: 'Video' },
                { value: 'pager', label: 'Pager' },
                { value: 'textphone', label: 'Textphone' },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description providing extra information about the phone service."
            >
              Description
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <DisplayTable<Language>
          columns={languageColumns}
          parentForm={parentForm}
          fieldLabel="languages"
          tooltipTitle="The details of the languages that are spoken at locations or services. This does not include languages which can only be used with interpretation."
          formLabel="Languages"
          formProps={{
            existingObjects: existingLanguages,
            existingLabels: ['name', 'note'],
            formTitle: 'Add Language',
            formItems: (_, ref) => <AddLanguageForm ref={ref} />,
            parseFields: {},
            parseObject: {},
          }}
        />
      </>
    );
  }
);

export default AddPhoneForm;
