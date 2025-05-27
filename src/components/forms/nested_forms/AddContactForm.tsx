import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Select,
  Divider,
  Table,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import Contact from '../../../interface/model/Contact';
import Phone from '../../../interface/model/Phone';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddPhoneForm from './AddPhoneForm';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import JSONDataModal from '../../JSONDataModal';

const AddContactForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingContacts,
  existingPhones,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (contact: Contact) => void;
  objectData: Contact[];
  existingContacts: Contact[];
  existingPhones: Phone[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [phoneData, setPhoneData] = useState<Phone[]>([]);
  const [showAttributeModal, setShowAttributeModal] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);
  const [JSONData, setJSONData] = useState<object>();

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

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
  };

  const handleAddPhone = (phone: Phone) => {
    const newPhones = [...phoneData, phone];
    setPhoneData(newPhones);
  };

  const handleDeletePhone = (phoneToDelete: Phone) => {
    const updatedPhones = phoneData.filter((phone) => phone !== phoneToDelete);
    setPhoneData(updatedPhones);
  };

  const isDuplicate = (newContact: Contact) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newContact)
    );
  };

  const handleSelect = (jsonValue: string) => {
    const contact = JSON.parse(jsonValue) as Contact;
    setSelectedContact(contact);
  };

  const handleClear = () => {
    setSelectedContact(null);
  };

  const addNewObject = async () => {
    if (selectedContact) {
      if (isDuplicate(selectedContact)) {
        showError();
        return;
      }
      addObject(selectedContact);
    } else {
      const values = await form.validateFields();
      const newContact: Contact = { ...values, phones: phoneData };
      if (isDuplicate(newContact)) {
        showError();
        return;
      }
      addObject(newContact);
    }

    closeModal();
    form.resetFields();
    setPhoneData([]);
    setSelectedContact(null);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate contacts not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setPhoneData([]);
        setSelectedContact(null);
      }}
      title="Add Contact"
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
      {contextHolder}
      <div className="flex flex-col gap-2 pb-2">
        <strong>Select Existing Contact</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Contact"
          options={Array.from(
            new Set(existingContacts.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Contact)
            .map((contact) => ({
              value: JSON.stringify(contact),
              label: contact.name,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={selectedContact ? JSON.stringify(selectedContact) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Contact</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedContact !== null}
      >
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
                onClick={() => setShowPhoneModal(true)}
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
          showModal={showPhoneModal}
          closeModal={() => setShowPhoneModal(false)}
          addObject={handleAddPhone}
          objectData={phoneData}
          existingPhones={existingPhones}
        />
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

export default AddContactForm;
