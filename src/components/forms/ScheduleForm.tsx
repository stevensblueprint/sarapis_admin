import AddScheduleForm from './nested_forms/AddScheduleForm';
import Schedule from '../../interface/model/Schedule';
import { scheduleColumns } from '../../data/FormTableColumns';
import { FormInstance } from 'antd';
import DisplayTable from './DisplayTable';
import { scheduleParser } from '../../utils/form/ParseUtils';

const ScheduleForm = ({ parentForm }: { parentForm: FormInstance }) => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col w-3/4">
        <DisplayTable<Schedule>
          columns={scheduleColumns}
          parentForm={parentForm}
          fieldLabel="schedules"
          tooltipTitle="The details of when a service or location is open."
          formLabel="Schedules"
          formProps={{
            existingObjects: [],
            existingLabels: [],
            formTitle: 'Add Schedule',
            formItems: (_, ref) => <AddScheduleForm ref={ref} />,
            parseFields: scheduleParser,
            parseObject: {},
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleForm;
