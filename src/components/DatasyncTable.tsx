import DatasyncTableRow from '../interface/model/Datasync';
import { Table, Modal, TableProps, Button, Input } from 'antd';
import { useState } from 'react';
import {
  InfoCircleOutlined,
  SearchOutlined,
  CloseOutlined,
  FilterOutlined,
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
  const [requestTypeFilterIndex, setRequestTypeFilterIndex] = useState(0);
  const [statusFilterIndex, setStatusFilterIndex] = useState(0);
  const [formatFilterIndex, setFormatFilterIndex] = useState(0);

  const requestTypeFilters = [null, 'Export', 'Import'];
  const statusFilters = [null, true, false];
  const formatFilters = [null, 'CSV', 'PDF'];

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
      width: '10%',
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
      width: '12%',
      ellipsis: true,
    },
    {
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          <span>Request Type</span>
          <Button
            icon={<FilterOutlined />}
            size="small"
            type="link"
            onClick={() => {
              const newFilterIndex = (requestTypeFilterIndex + 1) % 3;
              setRequestTypeFilterIndex(newFilterIndex);
              if (requestTypeFilters[newFilterIndex] === null) {
                setFilteredDataSource(null);
              } else {
                const filteredData = dataSource.filter(
                  (row) => row.type === requestTypeFilters[newFilterIndex]
                );
                setFilteredDataSource(filteredData);
              }
            }}
          />
        </div>
      ),
      dataIndex: 'type',
      width: '13%',
      ellipsis: true,
    },
    {
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          <span>Status</span>
          <Button
            icon={<FilterOutlined />}
            size="small"
            type="link"
            onClick={() => {
              const newFilterIndex = (statusFilterIndex + 1) % 3;
              setStatusFilterIndex(newFilterIndex);
              if (statusFilters[newFilterIndex] === null) {
                setFilteredDataSource(null);
              } else {
                const filteredData = dataSource.filter(
                  (row) => row.success === statusFilters[newFilterIndex]
                );
                setFilteredDataSource(filteredData);
              }
            }}
          />
        </div>
      ),
      dataIndex: 'success',
      width: '10%',
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
      width: '15%',
      ellipsis: true,
    },
    {
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          <span>Format</span>
          <Button
            icon={<FilterOutlined />}
            size="small"
            type="link"
            onClick={() => {
              const newFilterIndex = (formatFilterIndex + 1) % 3;
              setFormatFilterIndex(newFilterIndex);
              if (formatFilters[newFilterIndex] === null) {
                setFilteredDataSource(null);
              } else {
                const filteredData = dataSource.filter(
                  (row) => row.format === formatFilters[newFilterIndex]
                );
                setFilteredDataSource(filteredData);
              }
            }}
          />
        </div>
      ),
      dataIndex: 'format',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Files',
      dataIndex: 'data_exchange_files',
      ellipsis: true,
      width: '20%',
      render: (data_exchange_files: string[]) => {
        return <p className="truncate">{data_exchange_files.join(', ')}</p>;
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width: '10%',
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
