import { Form, Input, InputNumber, Tooltip } from 'antd';
import AddRequiredDocumentForm from './nested_forms/AddRequiredDocumentForm';
import RequiredDocument from '../../interface/model/RequiredDocument';
import {
  documentColumns,
  costOptionColumns,
} from '../../data/FormTableColumns';
import { FormInstance } from 'antd';
import CostOption from '../../interface/model/CostOption';
import AddCostOptionForm from './nested_forms/AddCostOptionForm';
import DisplayTable from './DisplayTable';
import { costOptionParser } from '../../utils/form/ParseUtils';

const ApplicationForm = ({ parentForm }: { parentForm: FormInstance }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center gap-4">
        <div className="w-1/3 flex flex-col">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of the steps needed to access this service."
              >
                Application Process
              </Tooltip>
            }
            name="application_process"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <div className="flex flex-row justify-between gap-4">
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The minimum age of a person required to meet this eligibility requirement."
                >
                  Minimum Age
                </Tooltip>
              }
              name="minimum_age"
            >
              <InputNumber className="w-[100%]" />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="The maximum age of a person required to meet this eligibility requirement."
                >
                  Maximum Age
                </Tooltip>
              }
              name="maximum_age"
            >
              <InputNumber className="w-[100%]" />
            </Form.Item>
          </div>
        </div>
        <div className="w-1/3">
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of any charges for service users to access this service."
              >
                Fees Description
              </Tooltip>
            }
            name="fees_description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip
                placement="topLeft"
                title="A free text description of the type of person for whom this service is intended."
              >
                Eligibility Description
              </Tooltip>
            }
            name="eligibility_description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col w-3/4 self-center">
        <DisplayTable<RequiredDocument>
          columns={documentColumns}
          parentForm={parentForm}
          fieldLabel="required_documents"
          tooltipTitle="The details of any documents that are required in order to access or use services."
          formLabel="Required Documents"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Required Document',
            formItems: (_, ref) => <AddRequiredDocumentForm ref={ref} />,
            parseFields: {},
            parseObject: {},
          }}
        />
        <DisplayTable<CostOption>
          columns={costOptionColumns}
          parentForm={parentForm}
          fieldLabel="cost_options"
          tooltipTitle="The costs of a service at certain points in time."
          formLabel="Cost Options"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Cost Option',
            formItems: (_, ref) => <AddCostOptionForm ref={ref} />,
            parseFields: costOptionParser,
            parseObject: {},
          }}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
