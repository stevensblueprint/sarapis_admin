import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Empty, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { JSX } from 'react';

interface CollapsibleFormTableProps<T> {
  formLabel: string;
  customForm: JSX.Element;
  emptyText: string;
  tableColumns: ColumnsType<T>;
  dataSource: T[];
}

const CollapsibleFormTable = <T,>({
  formLabel,
  customForm,
  emptyText,
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
