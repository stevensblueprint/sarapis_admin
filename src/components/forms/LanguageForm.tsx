import { Table, Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddLanguageForm from './nested_forms/AddLanguageForm';
import { FormInstance } from 'antd';
import Organization from '../../interface/model/Organization';
import Language from '../../interface/model/Language';
import { useState } from 'react';

const LanguageForm = ({
  form,
  organization,
}: {
  form: FormInstance;
  organization: Organization | undefined;
}) => {
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [languageData, setLanguageData] = useState<Language[]>([]);

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
              <Button icon={<PlusOutlined />} size="small" />
            </div>
          }
          name="languages"
        >
          <Table />
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
