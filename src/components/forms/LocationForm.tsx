import { Table, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';

const LocationForm = ({
  form,
  organization,
}: {
  form: FormInstance;
  organization: Organization;
}) => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Service Areas</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="service_areas"
        >
          <Table></Table>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Service At Locations</span>
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="service_at_locations"
        >
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default LocationForm;
