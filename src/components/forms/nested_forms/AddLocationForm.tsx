import {
  Modal,
  Button,
  Form,
  Input,
  Table,
  Select,
  Divider,
  Tooltip,
  InputNumber,
} from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Contact from '../../../interface/model/Contact';
import Phone from '../../../interface/model/Phone';
import Schedule from '../../../interface/model/Schedule';
import Location from '../../../interface/model/Location';
import AddContactForm from './AddContactForm';
import AddPhoneForm from './AddPhoneForm';
import AddScheduleForm from './AddScheduleForm';
import Language from '../../../interface/model/Language';
import Accessibility from '../../../interface/model/Accessibility';
import Address from '../../../interface/model/Address';
import AddLanguageForm from './AddLanguageForm';
import AddAddressForm from './AddAddressForm';
import AddAccessibilityForm from './AddAccessibilityForm';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import JSONDataModal from '../../JSONDataModal';

const AddLocationForm = ({
  showModal,
  closeModal,
  addObject,
  existingData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (location: Location) => void;
  existingData: [Location[], Contact[], Phone[], Schedule[]];
}) => {
  const [form] = Form.useForm();
  const [showModals, setShowModals] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [languageData, setLanguageData] = useState<Language[]>([]);
  const [addressData, setAddressData] = useState<Address[]>([]);
  const [contactData, setContactData] = useState<Contact[]>([]);
  const [accessibilityData, setAccessibilityData] = useState<Accessibility[]>(
    []
  );
  const [phoneData, setPhoneData] = useState<Phone[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);
  const [JSONData, setJSONData] = useState<object>();

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
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Language) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteLanguage(record);
          }}
        />
      ),
    },
  ];

  const addressColumns: ColumnsType = [
    {
      title: 'Address',
      dataIndex: 'address_1',
      width: '70%',
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      width: '20%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Address) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(record);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteContact(record);
          }}
        />
      ),
    },
  ];

  const accessibilityColumns: ColumnsType = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: '90%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: Address) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAccessibility(record);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePhone(record);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteSchedule(record);
          }}
        />
      ),
    },
  ];

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const handleSelect = (jsonValue: string) => {
    const location = JSON.parse(jsonValue) as Location;
    setSelectedLocation(location);
  };

  const handleClear = () => {
    setSelectedLocation(null);
  };

  const handleAddLanguage = (language: Language) => {
    const newLanguages = [...languageData, language];
    setLanguageData(newLanguages);
  };

  const handleDeleteLanguage = (languageToDelete: Language) => {
    const updatedLanguages = languageData.filter(
      (language) => language !== languageToDelete
    );
    setLanguageData(updatedLanguages);
  };

  const handleAddAddress = (address: Address) => {
    const newAddresses = [...addressData, address];
    setAddressData(newAddresses);
  };

  const handleDeleteAddress = (addressToDelete: Address) => {
    const updatedAddresses = addressData.filter(
      (address) => address !== addressToDelete
    );
    setAddressData(updatedAddresses);
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

  const handleAddAccessibility = (accessibility: Accessibility) => {
    const newAccessibilities = [...accessibilityData, accessibility];
    setAccessibilityData(newAccessibilities);
  };

  const handleDeleteAccessibility = (accessibilityToDelete: Accessibility) => {
    const updatedAccessibilities = accessibilityData.filter(
      (accessibility) => accessibility !== accessibilityToDelete
    );
    setAccessibilityData(updatedAccessibilities);
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

  const addNewObject = async () => {
    if (selectedLocation) {
      addObject(selectedLocation);
    } else {
      const values = await form.validateFields();
      const newLocation: Location = {
        ...values,
        languages: languageData,
        contacts: contactData,
        phones: phoneData,
        schedules: scheduleData,
        addresses: addressData,
        accessibility: accessibilityData,
      };
      addObject(newLocation);
    }

    closeModal();
    form.resetFields();
    setLanguageData([]);
    setContactData([]);
    setPhoneData([]);
    setScheduleData([]);
    setAddressData([]);
    setAccessibilityData([]);
    setSelectedLocation(null);
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setLanguageData([]);
        setContactData([]);
        setPhoneData([]);
        setScheduleData([]);
        setAddressData([]);
        setAccessibilityData([]);
        setSelectedLocation(null);
      }}
      title="Add Location"
      width="70%"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      <JSONDataModal
        showModal={showJSONModal}
        closeModal={() => setShowJSONModal(false)}
        data={JSONData ?? {}}
      />
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Location</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Location"
          options={Array.from(
            new Set(existingData[0].map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Location)
            .map((location) => ({
              value: JSON.stringify(location),
              label: location.name,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={
            selectedLocation ? JSON.stringify(selectedLocation) : undefined
          }
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Location</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedLocation !== null}
      >
        <div className="flex justify-center w-full">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-row gap-2">
              <Form.Item
                className="w-1/2"
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The name of the location."
                  >
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
                    title="An (optional) alternative name of the location."
                  >
                    Alternate Name
                  </Tooltip>
                }
                name="alternate_name"
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              label={
                <Tooltip
                  placement="topLeft"
                  title="A free text description of the location."
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
                <Tooltip
                  placement="topLeft"
                  title="A free text description of the access to public or private transportation to and from the location."
                >
                  Transportation
                </Tooltip>
              }
              name="transportation"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <div className="flex flex-row gap-2 justify-center">
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The latitude of the location expressed in decimal degrees in WGS84 datum."
                  >
                    Latitude
                  </Tooltip>
                }
                name="latitude"
              >
                <InputNumber className="w-full" />
              </Form.Item>
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The longitude of the location expressed in decimal degrees in WGS84 datum."
                  >
                    Longitude
                  </Tooltip>
                }
                name="longitude"
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </div>
            <div className="flex flex-row gap-2 justify-center">
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="A third party identifier for the location, which can be drawn from other services e.g. UK UPRN."
                  >
                    External Identifier
                  </Tooltip>
                }
                name="external_identifier"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <Tooltip
                    placement="topLeft"
                    title="The scheme used for the location’s external_identifier e.g. UK UPRN."
                  >
                    External Identifier Type
                  </Tooltip>
                }
                name="external_identifier_type"
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The languages that are spoken at locations or services. This does not include languages which can only be used with interpretation."
              >
                Languages
              </Tooltip>
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
          name="languages"
        >
          <Table
            columns={languageColumns}
            dataSource={languageData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddLanguageForm
          showModal={showModals[0]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[0] = false;
              return updated;
            })
          }
          addObject={handleAddLanguage}
          objectData={languageData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The addresses of locations where organizations operate."
              >
                Addresses
              </Tooltip>
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
          name="addresses"
        >
          <Table
            columns={addressColumns}
            dataSource={addressData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddAddressForm
          showModal={showModals[1]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[1] = false;
              return updated;
            })
          }
          addObject={handleAddAddress}
          objectData={addressData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The details of the named contacts for services and organizations."
              >
                Contacts
              </Tooltip>
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
          name="contacts"
        >
          <Table
            columns={contactColumns}
            dataSource={contactData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddContactForm
          showModal={showModals[2]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[2] = false;
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
              <Tooltip
                placement="topLeft"
                title="The details of the arrangements for access to locations for people who have disabilities"
              >
                Accessibility
              </Tooltip>
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
          name="accessibility"
        >
          <Table
            columns={accessibilityColumns}
            dataSource={accessibilityData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddAccessibilityForm
          showModal={showModals[3]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[3] = false;
              return updated;
            })
          }
          addObject={handleAddAccessibility}
          objectData={accessibilityData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The details of the telephone numbers used to contact organizations, services, and locations."
              >
                Phones
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[4] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="phones"
        >
          <Table
            columns={phoneColumns}
            dataSource={phoneData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddPhoneForm
          showModal={showModals[4]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[4] = false;
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
              <Tooltip
                placement="topLeft"
                title="The details of when a service or location is open. Entries are RFC 5545 RRULES."
              >
                Schedules
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setShowModals((prev) => {
                    const updated = [...prev];
                    updated[5] = true;
                    return updated;
                  })
                }
                size="small"
              />
            </div>
          }
          name="schedules"
        >
          <Table
            columns={scheduleColumns}
            dataSource={scheduleData}
            onRow={(record) => ({
              onClick: () => {
                setJSONData(record);
                setShowJSONModal(true);
              },
            })}
          />
        </Form.Item>
        <AddScheduleForm
          showModal={showModals[5]}
          closeModal={() =>
            setShowModals((prev) => {
              const updated = [...prev];
              updated[5] = false;
              return updated;
            })
          }
          addObject={handleAddSchedule}
          objectData={scheduleData}
          existingSchedules={existingData[3]}
        />
        <div className="w-full flex justify-center">
          <Form.Item
            className="w-2/3"
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
        </div>
      </Form>
    </Modal>
  );
};

export default AddLocationForm;
