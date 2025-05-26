import DatasyncTableRow from '../interface/model/Datasync';
import { Table, Modal, TableProps, Button, Input } from 'antd';
import { useState } from 'react';
import {
  InfoCircleOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const DatasyncTable = ({
  dataSource,
  rowsSelected,
}: {
  dataSource: DatasyncTableRow[];
  rowsSelected: (rowsSelected: string[]) => void;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [filteredDataSource, setFilteredDataSource] = useState<
    DatasyncTableRow[] | null
  >(null);

  const showModal = (errorMessage: string | null) => {
    setModalContent(errorMessage);
  };

  const handleCancel = () => {
    setModalContent(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          {showSearch ? (
            <div>
              <Input
                size="small"
                onChange={(e) => {
                  const searchText = e.target.value;
                  const filteredData = dataSource.filter((row) =>
                    row.user_id.toLowerCase().includes(searchText.toLowerCase())
                  );
                  setFilteredDataSource(filteredData);
                }}
              />
            </div>
          ) : (
            <span>User</span>
          )}
          {showSearch ? (
            <Button
              icon={<CloseOutlined />}
              danger
              size="small"
              type="link"
              onClick={() => {
                setFilteredDataSource(null);
                setShowSearch(false);
              }}
            />
          ) : (
            <Button
              icon={<SearchOutlined />}
              size="small"
              type="link"
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>
      ),
      dataIndex: 'user_id',
      filterSearch: true,
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Request Type',
      dataIndex: 'type',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'success',
      width: 100,
      ellipsis: true,
      render: (success: boolean, record: DatasyncTableRow) => {
        return success ? (
          <p>Success</p>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => showModal(record.error_message)}
          >
            <div className="flex flex-row gap-1">
              <p className="text-red-500">Failed</p>
              <InfoCircleOutlined />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Format',
      dataIndex: 'format',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Files',
      dataIndex: 'data_exchange_files',
      ellipsis: true,
      width: 300,
      render: (data_exchange_files: string[]) => {
        return <p className="truncate">{data_exchange_files.join(', ')}</p>;
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width: 100,
      ellipsis: true,
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
      disabled: record.type === 'Export' || !record.success,
    }),
  };

  return (
    <div className="w-full overflow-hidden">
      <Table
        className="w-full"
        rowSelection={rowSelection}
        dataSource={filteredDataSource ?? dataSource}
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowKey="id"
      />
      <Modal
        open={modalContent !== null}
        footer={null}
        onCancel={handleCancel}
        title="Error"
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default DatasyncTable;
