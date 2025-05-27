import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Select,
  Divider,
  InputNumber,
  Table,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import Phone from '../../../interface/model/Phone';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import Language from '../../../interface/model/Language';
import AddLanguageForm from './AddLanguageForm';
import AddAttributeForm from './AddAttributeForm';
import Attribute from '../../../interface/model/Attribute';
import JSONDataModal from '../../JSONDataModal';

const AddPhoneForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
  existingPhones,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (phone: Phone) => void;
  objectData: Phone[];
  existingPhones: Phone[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [languageData, setLanguageData] = useState<Language[]>([]);
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

  const handleAddAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributeData, attribute];
    setAttributeData(newAttributes);
    form.setFieldsValue({ attributes: newAttributes });
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

  const isDuplicate = (newPhone: Phone) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newPhone)
    );
  };

  const handleSelect = (jsonValue: string) => {
    const phone = JSON.parse(jsonValue) as Phone;
    setSelectedPhone(phone);
  };

  const handleClear = () => {
    setSelectedPhone(null);
  };

  const addNewObject = async () => {
    if (selectedPhone) {
      if (isDuplicate(selectedPhone)) {
        showError();
        return;
      }
      addObject(selectedPhone);
    } else {
      const values = await form.validateFields();
      const newPhone: Phone = { ...values, languages: languageData };
      if (isDuplicate(newPhone)) {
        showError();
        return;
      }
      addObject(newPhone);
    }

    closeModal();
    form.resetFields();
    setSelectedPhone(null);
    setLanguageData([]);
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate phones not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
        setSelectedPhone(null);
        setLanguageData([]);
      }}
      title="Add Phone"
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
        <strong>Select Existing Phone</strong>
        <Select
          allowClear
          showSearch
          placeholder="Select a Phone"
          options={Array.from(
            new Set(existingPhones.map((value) => JSON.stringify(value)))
          )
            .map((value) => JSON.parse(value) as Phone)
            .map((phone) => ({
              value: JSON.stringify(phone),
              label: phone.extension
                ? `${phone.number} Ext. ${phone.extension}`
                : phone.number,
            }))}
          onSelect={handleSelect}
          onClear={handleClear}
          value={selectedPhone ? JSON.stringify(selectedPhone) : undefined}
        />
      </div>

      <Divider />

      <div className="pb-2">
        <strong>Create New Phone</strong>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={selectedPhone !== null}
      >
        <div className="flex flex-row gap-2">
          <Form.Item
            className="w-5/12"
            label={
              <Tooltip placement="topLeft" title="The phone number.">
                Number
              </Tooltip>
            }
            name="number"
            rules={[{ required: true, message: 'Required Field!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-1/4"
            label={
              <Tooltip
                placement="topLeft"
                title="The extension of the phone number."
              >
                Extension
              </Tooltip>
            }
            name="extension"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            className="w-1/3"
            label={
              <Tooltip
                placement="topLeft"
                title="Indicates the type of phone service."
              >
                Type
              </Tooltip>
            }
            name="type"
          >
            <Select
              options={[
                { value: 'text (for SMS)', label: 'Text (for SMS)' },
                { value: 'voice', label: 'Voice' },
                { value: 'fax', label: 'Fax' },
                { value: 'cell', label: 'Cell' },
                { value: 'video', label: 'Video' },
                { value: 'pager', label: 'Pager' },
                { value: 'textphone', label: 'Textphone' },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text description providing extra information about the phone service."
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
            <div className="flex flex-row items-center gap-2 pt-2">
              <Tooltip
                placement="topLeft"
                title="The details of the languages that are spoken at locations or services. This does not include languages which can only be used with interpretation."
              >
                Languages
              </Tooltip>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowLanguageModal(true)}
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
          showModal={showLanguageModal}
          closeModal={() => setShowLanguageModal(false)}
          addObject={handleAddLanguage}
          objectData={languageData}
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

export default AddPhoneForm;
