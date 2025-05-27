import { Modal, Button, Form, Input, message, Select, Tooltip } from 'antd';
import Attribute from '../../../interface/model/Attribute';
import Taxonomy from '../../../interface/model/Taxonomy';
import TaxonomyTerm from '../../../interface/model/TaxonomyTerm';
import { useState, useEffect } from 'react';
import {
  getAllTaxonomies,
  getAllTaxonomyTerms,
} from '../../../api/lib/attributes';
import Response from '../../../interface/Response';
import { getLinkTypes } from '../../../api/lib/linkTypes';

const AddAttributeForm = ({
  showModal,
  closeModal,
  addObject,
  objectData,
}: {
  showModal: boolean;
  closeModal: () => void;
  addObject: (Attribute: Attribute) => void;
  objectData: Attribute[];
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [linkTypes, setLinkTypes] = useState<string[]>([]);
  const [taxonomyData, setTaxonomyData] = useState<Taxonomy[]>([]);
  const [taxonomyTermData, setTaxonomyTermData] = useState<TaxonomyTerm[]>([]);

  useEffect(() => {
    const fetchLinkTypes = async () => {
      const response = getLinkTypes();
      setLinkTypes(response);
    };
    const fetchTaxonomyData = async () => {
      const response = await getAllTaxonomies();
      const data = response.data as Response<Taxonomy[]>;
      setTaxonomyData(data.contents || []);
    };
    const fetchTaxonomyTermData = async () => {
      const response = await getAllTaxonomyTerms();
      const data = response.data as Response<TaxonomyTerm[]>;
      setTaxonomyTermData(data.contents || []);
    };
    fetchLinkTypes();
    fetchTaxonomyData();
    fetchTaxonomyTermData();
  }, []);

  const isDuplicate = (newAttribute: Attribute) => {
    return objectData.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(newAttribute)
    );
  };

  const addNewObject = async () => {
    const values = await form.validateFields();
    const newAttribute: Attribute = {
      ...values,
      taxonomy_term: JSON.parse(values.taxonomy_term) as TaxonomyTerm,
      taxonomy: JSON.parse(values.taxonomy) as Taxonomy,
    };
    if (isDuplicate(newAttribute)) {
      showError();
    } else {
      addObject(newAttribute);
      closeModal();
      form.resetFields();
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: 'Duplicate attributes not allowed!',
      duration: 5,
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      title="Add Attribute"
      footer={
        <Button type="primary" onClick={addNewObject}>
          Add
        </Button>
      }
    >
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A free text label of the attribute."
            >
              Label
            </Tooltip>
          }
          name="label"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="A code taken from an enumerated open codelist to indicate what the taxonomy term describes, e.g. the service eligibility or intended audience."
            >
              Link Type
            </Tooltip>
          }
          name="link_type"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Select
            showSearch
            options={linkTypes.map((type) => ({ value: type, label: type }))}
          />
        </Form.Item>
        <Form.Item
          label="Taxonomy Term"
          name="taxonomy_term"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Select
            showSearch
            options={taxonomyTermData.map((taxonomyTerm) => ({
              value: JSON.stringify(taxonomyTerm),
              label: `${taxonomyTerm.name} - ${taxonomyTerm.description}`,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The taxonomies from which taxonomy terms are taken."
            >
              Taxonomy
            </Tooltip>
          }
          name="taxonomy"
          rules={[{ required: true, message: 'Required Field!' }]}
        >
          <Select
            showSearch
            options={taxonomyData.map((taxonomy) => ({
              value: JSON.stringify(taxonomy),
              label: `${taxonomy.name} - ${taxonomy.description}`,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAttributeForm;
