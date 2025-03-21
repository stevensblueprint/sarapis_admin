import { JSX } from 'react';
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Collapse,
  Empty,
  Form,
  FormInstance,
  Select,
  Table,
  Button,
  Row,
  Col,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';

interface CollapsibleFormSelectTableProps<T> {
  formLabel: string;
  selectLabel: string;
  customForm: JSX.Element;
  dropdownLabel: string;
  dropdownName: string;
  dropdownPlaceholder: string;
  emptyText: string;
  parentForm: FormInstance;
  options: DefaultOptionType[];
  tableColumns: ColumnsType<T>;
  data: T[];
  setter: React.Dispatch<React.SetStateAction<T[]>>;
}

const CollapsibleFormSelectTable = <T,>({
  formLabel,
  selectLabel,
  customForm,
  dropdownLabel,
  dropdownName,
  dropdownPlaceholder,
  emptyText,
  parentForm,
  options,
  tableColumns,
  data,
}: CollapsibleFormSelectTableProps<T>) => {
  const handleAddClick = async () => {
    try {
      console.log(parentForm);
      const values = await parentForm.validateFields([dropdownName]);
      const selectedOption =
        typeof values[dropdownName] === 'object'
          ? values[dropdownName].value
          : values[dropdownName];
      if (selectedOption) {
        parentForm.resetFields([dropdownName]);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div>
      <Collapse
        bordered={true}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={[
          {
            key: '1',
            label: formLabel,
            children: customForm,
          },
          {
            key: '2',
            label: selectLabel,
            children: (
              <Form form={parentForm}>
                <Form.Item
                  label={dropdownLabel}
                  name={dropdownName}
                  rules={[{ required: true, message: 'Required field!' }]}
                >
                  <Row gutter={8}>
                    <Col flex="auto">
                      <Form.Item
                        name={dropdownName}
                        rules={[{ required: true, message: 'Required field!' }]}
                        style={{ margin: 0 }}
                      >
                        <Select
                          showSearch
                          placeholder={dropdownPlaceholder}
                          options={options}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button icon={<PlusOutlined />} onClick={handleAddClick}>
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
      <Table
        rowKey={(_, index) => index as number}
        pagination={{ pageSize: 5 }}
        columns={tableColumns.map((column, index) => ({
          ...column,
          key: column.key || index.toString(),
        }))}
        dataSource={data}
        locale={{
          emptyText: <Empty description={`No ${emptyText} available`} />,
        }}
        className="mt-10"
      />
    </div>
  );
};

export default CollapsibleFormSelectTable;
