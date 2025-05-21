import { Modal, Button, Form, Input, message, Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ServiceAtLocation from '../../../interface/model/ServiceAtLocation';
import ServiceArea from '../../../interface/model/ServiceArea';
import Contact from '../../../interface/model/Contact';
import Phone from '../../../interface/model/Phone';
import Schedule from '../../../interface/model/Schedule';
import Location from '../../../interface/model/Location';
import AddServiceAreaForm from './AddServiceAreaForm';
import AddContactForm from './AddContactForm';
import AddPhoneForm from './AddPhoneForm';
import AddScheduleForm from './AddScheduleForm';

const AddServiceAtLocationForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (serviceAtLocation: ServiceAtLocation) => void;
  objectData: ServiceAtLocation[];
  existingData: [ServiceArea[], Contact[], Phone[], Schedule[], Location[]];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [showModals, setShowModals] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [serviceAreaData, setServiceAreaData] = useState<ServiceArea[]>([]);
  const [contactData, setContactData] = useState<Contact[]>([]);
  const [phoneData, setPhoneData] = useState<Phone[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const serviceAreaColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '60%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: ServiceArea) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteServiceArea(record)}
        />
      ),
    },
  ];

  const contactColumns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Contact) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteContact(record)}
        />
      ),
    },
  ];

  const phoneColumns: ColumnsType = [
    {
      title: 'Number',
      dataIndex: 'number',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Extension',
      dataIndex: 'extension',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '50%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Phone) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeletePhone(record)}
        />
      ),
    },
  ];

  const scheduleColumns: ColumnsType = [
    {
      title: 'Opens At',
      dataIndex: 'opens_at',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Closes At',
      dataIndex: 'closes_at',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '60%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Schedule) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteSchedule(record)}
        />
      ),
    },
  ];

  const handleAddServiceArea = (serviceArea: ServiceArea) => {
    const newServiceAreas = [...serviceAreaData, serviceArea];
    setServiceAreaData(newServiceAreas);
  };

  const handleDeleteServiceArea = (serviceAreaToDelete: ServiceArea) => {
    const updatedServiceAreas = serviceAreaData.filter(
      (serviceArea) => serviceArea !== serviceAreaToDelete
    );
    setServiceAreaData(updatedServiceAreas);
  };

  const handleAddContact = (contact: Contact) => {
    const newContacts = [...contactData, contact];
    setContactData(newContacts);
  };

  const handleDeleteContact = (contactToDelete: Contact) => {
    const updatedContacts = contactData.filter(
      (contact) => contact !== contactToDelete
    );
    setContactData(updatedContacts);
  };

  const handleAddPhone = (phone: Phone) => {
    const newPhones = [...phoneData, phone];
    setPhoneData(newPhones);
  };

  const handleDeletePhone = (phoneToDelete: Phone) => {
    const updatedPhones = phoneData.filter((phone) => phone !== phoneToDelete);
    setPhoneData(updatedPhones);
  };

  const handleAddSchedule = (schedule: Schedule) => {
    const newSchedules = [...scheduleData, schedule];
    setScheduleData(newSchedules);
  };

  const handleDeleteSchedule = (scheduleToDelete: Schedule) => {
    const updatedSchedules = scheduleData.filter(
      (schedule) => schedule !== scheduleToDelete
    );
    setScheduleData(updatedSchedules);
  };

  const handleAddLocation = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleDeleteLocation = () => {
    setSelectedLocation(undefined);
  };

  const isDuplicate = (newServiceAtLocation: ServiceAtLocation) => {
    return objectData.some(
      (existing) =>
        JSON.stringify(existing) === JSON.stringify(newServiceAtLocation)
    );
  };

  const addNewObject = async () => {
    try {
      const values = await form.validateFields();
      const newServiceAtLocation: ServiceAtLocation = {
        ...values,
        service_areas: serviceAreaData,
        contacts: contactData,
        phones: phoneData,
        schedules: scheduleData,
        location: selectedLocation,
      };

      if (isDuplicate(newServiceAtLocation)) {
        showError();
      } else {
        addObject(newServiceAtLocation);
        closeModal();
        form.resetFields();
        setServiceAreaData([]);
        setContactData([]);
        setPhoneData([]);
        setScheduleData([]);
        setSelectedLocation(undefined);
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate service at location not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setServiceAreaData([]);
        setContactData([]);
        setPhoneData([]);
        setScheduleData([]);
        setSelectedLocation(undefined);
      }}
      title="Add Service At Location"
      width="70%"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Service Areas</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[0] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="service_areas"
        >
          <Table columns={serviceAreaColumns} dataSource={serviceAreaData} />
        </Form.Item>
        <AddServiceAreaForm
          showModal={showModals[0]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[0] = false;
              return updated;
            })
          }
          addObject={handleAddServiceArea}
          objectData={serviceAreaData}
          existingServiceAreas={existingData[0]}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Contacts</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[1] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="contacts"
        >
          <Table columns={contactColumns} dataSource={contactData} />
        </Form.Item>
        <AddContactForm
          showModal={showModals[1]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[1] = false;
              return updated;
            })
          }
          addObject={handleAddContact}
          objectData={contactData}
          existingContacts={existingData[1]}
          existingPhones={existingData[2]}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Phones</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[2] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="phones"
        >
          <Table columns={phoneColumns} dataSource={phoneData} />
        </Form.Item>
        <AddPhoneForm
          showModal={showModals[2]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[2] = false;
              return updated;
            })
          }
          addObject={handleAddPhone}
          objectData={phoneData}
          existingPhones={existingData[2]}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Schedules</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[3] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="schedules"
        >
          <Table columns={scheduleColumns} dataSource={scheduleData} />
        </Form.Item>
        <AddScheduleForm
          showModal={showModals[3]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[3] = false;
              return updated;
            })
          }
          addObject={handleAddSchedule}
          objectData={scheduleData}
          existingSchedules={existingData[3]}
        />
      </Form>
    </Modal>
  );
};

export default AddServiceAtLocationForm;
