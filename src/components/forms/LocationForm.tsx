import { Table, Form } from 'antd';

const LocationForm = () => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-4 w-3/4">
        <Form.Item label="Service Areas" name="service_areas">
          <Table></Table>
        </Form.Item>
        <Form.Item label="Service At Locations" name="service_at_locations">
          <Table></Table>
        </Form.Item>
      </div>
    </div>
  );
};

export default LocationForm;
