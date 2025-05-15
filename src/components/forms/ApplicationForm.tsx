import { Form, Input, InputNumber, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RequiredDocumentForm from './nested_forms/RequiredDocumentForm';
import RequiredDocument from '../../interface/model/RequiredDocument';
import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import CostOption from '../../interface/model/CostOption';
import CostOptionForm from './nested_forms/CostOptionForm';

const ApplicationForm = ({ form }: { form: FormInstance }) => {
  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);
  const [documentData, setDocumentData] = useState<RequiredDocument[]>([]);
  const [showCostOptionModal, setShowCostOptionModal] =
    useState<boolean>(false);
  const [costOptionData, setCostOptionData] = useState<CostOption[]>([]);

  const documentColumns: ColumnsType = [
    {
      title: 'Document',
      dataIndex: 'document',
      width: '60%',
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'uri',
      width: '30%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: RequiredDocument) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteDocument(record)}
        />
      ),
    },
  ];

  const costOptionColumns: ColumnsType = [
    {
      title: 'Currency',
      dataIndex: 'currency',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'amount_description',
      width: '60%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'delete',
      width: '10%',
      align: 'center',
      render: (record: CostOption) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteCostOption(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const existingDocuments = form.getFieldValue('required_documents') || [];
    setDocumentData(existingDocuments);
    const existingCostOptions = form.getFieldValue('cost_options') || [];
    setCostOptionData(existingCostOptions);
  }, [form]);

  const handleAddDocument = (document: RequiredDocument) => {
    const newDocuments = [...documentData, document];
    setDocumentData(newDocuments);
    form.setFieldsValue({ required_documents: newDocuments });
  };

  const handleDeleteDocument = (documentToDelete: RequiredDocument) => {
    const updatedDocuments = documentData.filter(
      (document) => document !== documentToDelete
    );
    setDocumentData(updatedDocuments);
    form.setFieldsValue({ required_documents: updatedDocuments });
  };

  const handleAddCostOption = (costOption: CostOption) => {
    const newCostOptions = [...costOptionData, costOption];
    setCostOptionData(newCostOptions);
    form.setFieldsValue({ cost_options: newCostOptions });
  };

  const handleDeleteCostOption = (costOptionToDelete: CostOption) => {
    const updatedCostOptions = costOptionData.filter(
      (costOption) => costOption !== costOptionToDelete
    );
    setCostOptionData(updatedCostOptions);
    form.setFieldsValue({ cost_options: updatedCostOptions });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center gap-4">
        <div className="w-1/3 flex flex-col">
          <Form.Item label="Application Process" name="application_process">
            <Input.TextArea rows={5} />
          </Form.Item>
          <div className="flex flex-row justify-between gap-4">
            <Form.Item label="Minimum Age" name="minimum_age">
              <InputNumber className="w-[100%]" />
            </Form.Item>
            <Form.Item label="Maximum Age" name="maximum_age">
              <InputNumber className="w-[100%]" />
            </Form.Item>
          </div>
        </div>
        <div className="w-1/3">
          <Form.Item label="Fees Description" name="fees_description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Eligibility Description"
            name="eligibility_description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-3/4 self-center">
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Required Documents</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowDocumentModal(true)}
                size="small"
              />
            </div>
          }
          name="required_documents"
        >
          <Table columns={documentColumns} dataSource={documentData} />
        </Form.Item>
        <RequiredDocumentForm
          showModal={showDocumentModal}
          closeModal={() => setShowDocumentModal(false)}
          addObject={handleAddDocument}
          objectData={documentData}
        />
        <Form.Item
          label={
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Cost Options</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setShowCostOptionModal(true)}
                size="small"
              />
            </div>
          }
          name="cost_options"
        >
          <Table columns={costOptionColumns} dataSource={costOptionData} />
        </Form.Item>
        <CostOptionForm
          showModal={showCostOptionModal}
          closeModal={() => setShowCostOptionModal(false)}
          addObject={handleAddCostOption}
          objectData={costOptionData}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
