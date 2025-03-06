import DatasyncTableRow from '../interface/model/Datasync';
import { Table, Modal, TableProps } from 'antd';
import { useState } from 'react';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const DatasyncTable = ({
  dataSource,
  rowsSelected,
}: {
  dataSource: DatasyncTableRow[] | undefined;
  rowsSelected: (rowsSelected: string[]) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'User',
      dataIndex: 'uuid',
      width: 150,
    },
    {
      title: 'Request Type',
      dataIndex: 'request_type',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      render: (status: string, record: DatasyncTableRow) => {
        return status !== 'Success' ? (
          <div>
            <span
              style={{ cursor: 'pointer', color: '#1890ff' }}
              onClick={showModal}
            >
              {status}
            </span>
            <Modal
              open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
              title="Error"
            >
              <p>{record.status_message}</p>
            </Modal>
          </div>
        ) : (
          <span>{status}</span>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      width: 200,
    },
    {
      title: 'Format',
      dataIndex: 'format',
      width: 150,
    },
    {
      title: 'Files',
      dataIndex: 'file_names',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width: 150,
    },
  ];

  const rowSelection: TableRowSelection<DatasyncTableRow> = {
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: DatasyncTableRow[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      rowsSelected(selectedRows.map((row) => row.id));
    },
    getCheckboxProps: (record: DatasyncTableRow) => ({
      disabled: record.request_type === 'Export',
    }),
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default DatasyncTable;
