import { Table, Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddLanguageForm from './nested_forms/AddLanguageForm';
import { FormInstance } from 'antd';
import Language from '../../interface/model/Language';
import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';

const LanguageForm = ({ form }: { form: FormInstance }) => {
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [languageData, setLanguageData] = useState<Language[]>([]);

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
          onClick={() => handleDeleteLanguage(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingLanguages = form.getFieldValue('languages') || [];
    setLanguageData(existingLanguages);
  }, [form]);

  const handleAddLanguage = (language: Language) => {
    const newLanguages = [...languageData, language];
    setLanguageData(newLanguages);
    form.setFieldsValue({ languages: newLanguages });
  };

  const handleDeleteLanguage = (languageToDelete: Language) => {
    const updatedLanguages = languageData.filter(
      (language) => language !== languageToDelete
    );
    setLanguageData(updatedLanguages);
    form.setFieldsValue({ languages: updatedLanguages });
  };

  return (
    <div className="w-[100%] flex justify-center">
      <div className="flex flex-col gap-2 w-3/4">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Languages</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowLanguageModal(true)}
                size="small"
              />
            </div>
          }
          name="languages"
        >
          <Table columns={languageColumns} dataSource={languageData} />
        </Form.Item>
        <AddLanguageForm
          showModal={showLanguageModal}
          closeModal={() => setShowLanguageModal(false)}
          addObject={handleAddLanguage}
          objectData={languageData}
        />
        <Form.Item
          className="w-2/3 self-center"
          label="Interpretation Services"
          name="interpretation_services"
        >
          <Input.TextArea />
        </Form.Item>
      </div>
    </div>
  );
};

export default LanguageForm;
