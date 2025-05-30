import { Form, Tooltip, Input, FormInstance } from 'antd';
import { JSX, forwardRef, useImperativeHandle } from 'react';
import DisplayTable from '../DisplayTable';
import Phone from '../../../interface/model/Phone';
import AddPhoneForm from './AddPhoneForm';
import Language from '../../../interface/model/Language';
import { phoneColumns } from '../../../data/FormTableColumns';
import { phoneExistingLabels } from '../../../data/FormExistingLabels';

interface AddContactFormProps {
  parentForm: FormInstance;
  existingPhones: Phone[];
  existingLanguages: Language[];
}

const AddContactForm = forwardRef(
  (
    { parentForm, existingPhones, existingLanguages }: AddContactFormProps,
    ref
  ): JSX.Element => {
    useImperativeHandle(ref, () => ({
      resetState: () => {},
    }));

    return (
      <>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip placement="topLeft" title="The name of the contact.">
                Name
              </Tooltip>
            }
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="The job title of the contact."
              >
                Title
              </Tooltip>
            }
            name="title"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="The department that the contact is a part of."
              >
                Department
              </Tooltip>
            }
            name="department"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="The email address of the contact."
              >
                Email
              </Tooltip>
            }
            name="email"
            rules={[{ type: 'email', message: 'Invalid Email!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <DisplayTable<Phone>
          columns={phoneColumns}
          parentForm={parentForm}
          fieldLabel="phones"
          tooltipTitle="The details of the telephone numbers are used to contact organizations, services, and locations."
          formLabel="Phones"
          formProps={{
            existingObjects: existingPhones,
            existingLabels: phoneExistingLabels,
            formTitle: 'Add Phone',
            formItems: (form, ref) => (
              <AddPhoneForm
                parentForm={form}
                existingLanguages={existingLanguages}
                ref={ref}
              />
            ),
            parseFields: {},
            parseObject: {},
          }}
        />
      </>
    );
  }
);

export default AddContactForm;
