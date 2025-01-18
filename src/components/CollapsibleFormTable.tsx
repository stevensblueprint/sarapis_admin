import { JSX } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Empty, Form, FormInstance, Select, Table } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';

interface CollapsibleFormTableProps<T> {
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
  dataSource: T[];
}

const CollapsibleFormTable = <T,>({
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
  dataSource,
}: CollapsibleFormTableProps<T>) => {
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
              <div>
                <Form form={parentForm}>
                  <Form.Item
                    label={dropdownLabel}
                    name={dropdownName}
                    rules={[{ required: true, message: 'Required field!' }]}
                  >
                    <Select
                      showSearch
                      placeholder={dropdownPlaceholder}
                      options={options}
                    />
                  </Form.Item>
                </Form>
              </div>
            ),
          },
        ]}
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={tableColumns}
        dataSource={dataSource}
        locale={{
          emptyText: <Empty description={`No ${emptyText} available`} />,
        }}
        className="mt-10"
      />
    </div>
  );
};

export default CollapsibleFormTable;
