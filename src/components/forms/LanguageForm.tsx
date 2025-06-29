import { Input, Form, Tooltip } from 'antd';
import AddLanguageForm from './nested_forms/AddLanguageForm';
import { FormInstance } from 'antd';
import Language from '../../interface/model/Language';
import { languageColumns } from '../../data/FormTableColumns';
import DisplayTable from './DisplayTable';

const LanguageForm = ({ parentForm }: { parentForm: FormInstance }) => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <DisplayTable<Language>
          columns={languageColumns}
          parentForm={parentForm}
          fieldLabel="languages"
          tooltipTitle="The details of the languages that are spoken at locations or services. This does not include languages which can only be used with interpretation."
          formLabel="Languages"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Language',
            formItems: () => <AddLanguageForm />,
            parseFields: {},
            parseObject: {},
          }}
        />
        <Form.Item
          className="w-2/3 self-center"
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description of any interpretation services available for accessing this service."
            >
              Interpretation Services
            </Tooltip>
          }
          name="interpretation_services"
        >
          <Input.TextArea />
        </Form.Item>
      </div>
    </div>
  );
};

export default LanguageForm;
