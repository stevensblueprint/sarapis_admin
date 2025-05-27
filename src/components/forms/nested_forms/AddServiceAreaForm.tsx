import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Select,
  Divider,
  Tooltip,
} from 'antd';
import ServiceArea from '../../../interface/model/ServiceArea';
import { useState } from 'react';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import { PlusOutlined } from '@ant-design/icons';

const AddServiceAreaForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingServiceAreas,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (ServiceArea: ServiceArea) => void;
  objectData: ServiceArea[];
  existingServiceAreas: ServiceArea[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedServiceArea, setSelectedServiceArea] =
    useState<ServiceArea | null>(null);
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);

  const isDuplicate = (newServiceArea: ServiceArea) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newServiceArea)
    );
  };

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const handleSelect = (jsonValue: string) => {
    const serviceArea = JSON.parse(jsonValue) as ServiceArea;
    setSelectedServiceArea(serviceArea);
  };

  const handleClear = () => {
    setSelectedServiceArea(null);
  };

  const addNewObject = async () => {
    if (selectedServiceArea) {
      if (isDuplicate(selectedServiceArea)) {
        showError();
        return;
      }
      addObject(selectedServiceArea);
    } else {
      const values = await form.validateFields();
      const newServiceArea: ServiceArea = { ...values };
      if (isDuplicate(newServiceArea)) {
        showError();
        return;
      }
      addObject(newServiceArea);
    }

    closeModal();
    form.resetFields();
    setSelectedServiceArea(null);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate service areas not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setSelectedServiceArea(null);
      }}
      title="Add Service Area"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Service Area</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Service Area"
          options={Array.from(
            new Set(existingServiceAreas.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as ServiceArea)
            .map((serviceArea) => ({
              value: JSON.stringify(serviceArea),
              label: serviceArea.name,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={
            selectedServiceArea
              ? JSON.stringify(selectedServiceArea)
              : undefined
          }
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Service Area</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedServiceArea !== null}
      >
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text geographic area where a service is available."
            >
              Name
            </Tooltip>
          }
          name="name"
        >
          <Input />
        </Form.Item>
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="The format of the extent field populated from an enum of “geojson”, “topojson”, “kml”,and (for legacy systems or early state during transformation) “text”."
              >
                Extent Type
              </Tooltip>
            }
            name="extent_type"
          >
            <Select
              options={[
                { value: 'geojson', label: 'GeoJSON' },
                { value: 'topojson', label: 'Topological GeoJSON' },
                { value: 'kml', label: 'Keyhole Markup Language' },
                { value: 'text', label: 'Text' },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label={
              <Tooltip
                placement="topLeft"
                title="A URI which acts as a persistent identifier to identify an area."
              >
                URI
              </Tooltip>
            }
            name="uri"
            rules={[{ type: 'url', message: 'Invalid URL!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A definition of the polygon defining the area."
            >
              Extent
            </Tooltip>
          }
          name="extent"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A more detailed free text description of this service area. Used to provide any additional information that cannot be communicated using the structured area and geometry fields."
            >
              Description
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
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

export default AddServiceAreaForm;
