import { getLinkTypes } from '../../../api/lib/linkTypes';
import { Form, Tooltip, Input, Select } from 'antd';
import {
  useState,
  JSX,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import Taxonomy from '../../../interface/model/Taxonomy';
import TaxonomyTerm from '../../../interface/model/TaxonomyTerm';
import {
  getAllTaxonomies,
  getAllTaxonomyTerms,
} from '../../../api/lib/attributes';
import Response from '../../../interface/Response';

const AddAttributeForm = forwardRef((_, ref): JSX.Element => {
  useImperativeHandle(ref, () => ({
    resetState: () => {},
  }));

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

  return (
    <>
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
    </>
  );
});

export default AddAttributeForm;
