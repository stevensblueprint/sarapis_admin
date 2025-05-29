import { Form, Tooltip, Input, Button, Select, FormInstance } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, JSX, forwardRef, useImperativeHandle } from 'react';
import Attribute from '../../../interface/model/Attribute';
import NestedForm from '../NestedForm';
import { handleAddNestedObject } from '../../../utils/form/FormUtils';
import AddAttributeForm from './AddAttributeForm';
import TaxonomyTerm from '../../../interface/model/TaxonomyTerm';
import LinkType from '../../../interface/model/LinkType';

const AddURLForm = forwardRef(
  ({ parentForm }: { parentForm?: FormInstance }, ref): JSX.Element => {
    const [showAttributeModal, setShowAttributeModal] =
      useState<boolean>(false);
    const [attributeData, setAttributeData] = useState<Attribute[]>([]);

    useImperativeHandle(ref, () => ({
      resetState: () => setAttributeData([]),
    }));

    return (
      <>
        <Form.Item
          label={
            <Tooltip
              placement="topLeft"
              title="The human-readable label for this url e.g. “Twitter” or “Website”."
            >
              Name
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
              title="The URL for this URL object. This must be formatted as a valid URI."
            >
              URL
            </Tooltip>
          }
          name="url"
          rules={[
            {
              type: 'url',
              message: 'Invalid URL!',
            },
            {
              required: true,
              message: 'URL is required!',
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        <NestedForm<Attribute>
          showModal={showAttributeModal}
          closeModal={() => setShowAttributeModal(false)}
          addObject={(attribute: Attribute) =>
            setAttributeData(
              handleAddNestedObject(
                attribute,
                attributeData,
                'attributes',
                parentForm!
              )
            )
          }
          objectData={attributeData}
          existingObjects={[]}
          existingLabels={['label', 'taxonomy_term.name']}
          formItems={(_, ref) => <AddAttributeForm ref={ref} />}
          formTitle="Add Attribute"
          parseFields={{
            link_type: {
              parser: (value: string) => JSON.parse(value) as LinkType,
            },
            taxonomy_term: {
              parser: (value: string) => JSON.parse(value) as TaxonomyTerm,
            },
            'taxonomy_term.taxonomy_detail': {
              parser: (value: string) => JSON.parse(value) as TaxonomyTerm,
              inputPath: 'taxonomy',
            },
          }}
          parseObject={{}}
        />
      </>
    );
  }
);

export default AddURLForm;
