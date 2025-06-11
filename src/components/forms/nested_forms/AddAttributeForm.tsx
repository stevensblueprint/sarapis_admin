import {
  Form,
  Tooltip,
  Input,
  Select,
  FormInstance,
  Modal,
  Button,
  message,
} from 'antd';
import { useState, JSX, useEffect } from 'react';
import Taxonomy from '../../../interface/model/Taxonomy';
import TaxonomyTerm from '../../../interface/model/TaxonomyTerm';
import {
  getAllTaxonomies,
  getAllTaxonomyTerms,
} from '../../../api/lib/attributes';
import { getAllLinkTypes } from '../../../api/lib/linkTypes';
import Response from '../../../interface/Response';
import LinkType from '../../../interface/model/LinkType';
import {
  handleAddObject,
  handleAddNestedObject,
} from '../../../utils/form/FormUtils';
import Attribute from '../../../interface/model/Attribute';
import { attributeParser } from '../../../utils/form/ParseUtils';

interface AddAttributeFormProps {
  parentForm: FormInstance;
  showModal: boolean;
  closeModal: () => void;
  objectData: Attribute[];
  addObject: (attributes: Attribute[]) => void;
}

const AddAttributeForm = ({
  parentForm,
  showModal,
  closeModal,
  objectData,
  addObject,
}: AddAttributeFormProps): JSX.Element => {
  const [form] = Form.useForm();
  const [linkTypes, setLinkTypes] = useState<LinkType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [taxonomyData, setTaxonomyData] = useState<Taxonomy[]>([]);
  const [taxonomyTermData, setTaxonomyTermData] = useState<TaxonomyTerm[]>([]);

  useEffect(() => {
    const fetchLinkTypes = async () => {
      const response = await getAllLinkTypes();
      const data = response.data as Response<LinkType[]>;
      setLinkTypes(data.contents || []);
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

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      title="Add Attribute"
      footer={
        <Button
          type="primary"
          onClick={() => {
            handleAddObject<Attribute>(
              form,
              objectData,
              messageApi,
              (attribute: Attribute) =>
                addObject(
                  handleAddNestedObject<Attribute>(
                    attribute,
                    objectData,
                    'attributes',
                    parentForm
                  )
                ),
              closeModal,
              attributeParser,
              () => {}
            );
          }}
        >
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
            options={linkTypes.map((type) => ({
              value: JSON.stringify(type),
              label: type.link_type,
            }))}
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
