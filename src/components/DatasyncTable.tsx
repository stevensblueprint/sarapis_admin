import DatasyncTableRow from '../interface/model/DatasyncTableRow';
import { Table, Modal, TableProps, Button, Input, DatePicker } from 'antd';
import { useState } from 'react';
import {
  InfoCircleOutlined,
  SearchOutlined,
  CloseOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Dayjs } from 'dayjs';

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
  const [showUserSearch, setShowUserSearch] = useState<boolean>(false);
  const [showFilesSearch, setShowFilesSearch] = useState<boolean>(false);
  const [filteredDataSource, setFilteredDataSource] = useState<
    DatasyncTableRow[] | null
  >(null);
  const [requestTypeFilterIndex, setRequestTypeFilterIndex] = useState(0);
  const [statusFilterIndex, setStatusFilterIndex] = useState(0);
  const [formatFilterIndex, setFormatFilterIndex] = useState(0);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [showTimestampModal, setShowTimestampModal] = useState<boolean>(false);

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
          {showUserSearch ? (
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
          {showUserSearch ? (
            <Button
              icon={<CloseOutlined />}
              danger
              size="small"
              type="link"
              onClick={() => {
                setFilteredDataSource(null);
                setShowUserSearch(false);
              }}
            />
          ) : (
            <Button
              icon={<SearchOutlined />}
              size="small"
              type="link"
              onClick={() => setShowUserSearch(true)}
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
            type={requestTypeFilterIndex == 0 ? 'dashed' : 'link'}
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
            type={statusFilterIndex == 0 ? 'dashed' : 'link'}
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
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          <span>Timestamp</span>
          <Button
            icon={<FilterOutlined />}
            size="small"
            type={dateRange ? 'link' : 'dashed'}
            onClick={() => {
              setShowTimestampModal(true);
            }}
          />
        </div>
      ),
      dataIndex: 'timestamp',
      width: '15%',
      ellipsis: true,
      render: (timestamp: Dayjs) => {
        return timestamp.format('YYYY-MM-DD HH:mm:ss.SSS');
      },
    },
    {
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          <span>Format</span>
          <Button
            icon={<FilterOutlined />}
            size="small"
            type={formatFilterIndex == 0 ? 'dashed' : 'link'}
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
      title: (
        <div className="flex flex-row justify-between items-center gap-2">
          {showFilesSearch ? (
            <div>
              <Input
                size="small"
                onChange={(e) => {
                  const searchValues = e.target.value
                    .split(',')
                    .map((s) => s.trim().toLowerCase())
                    .filter(Boolean);
                  const filteredData = dataSource.filter((row) =>
                    row.data_exchange_files.some((file) =>
                      searchValues.some((search) =>
                        file.toLowerCase().includes(search)
                      )
                    )
                  );
                  setFilteredDataSource(filteredData);
                }}
              />
            </div>
          ) : (
            <span>Files</span>
          )}
          {showFilesSearch ? (
            <Button
              icon={<CloseOutlined />}
              danger
              size="small"
              type="link"
              onClick={() => {
                setFilteredDataSource(null);
                setShowFilesSearch(false);
              }}
            />
          ) : (
            <Button
              icon={<SearchOutlined />}
              size="small"
              type="link"
              onClick={() => setShowFilesSearch(true)}
            />
          )}
        </div>
      ),
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
      render: (size: number) => {
        const formatFileSize = (size: number | null): string => {
          if (!size) return '';
          return size < 1000000
            ? `${(size / 1000).toFixed(2)} KB`
            : `${(size / 1000000).toFixed(2)} MB`;
        };

        return formatFileSize(size);
      },
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
      <Modal
        open={showTimestampModal}
        title="Sort by Timestamp"
        onCancel={() => {
          setShowTimestampModal(false);
        }}
        footer={
          <div className="flex flex-row gap-2 justify-end">
            <Button
              danger
              disabled={
                dateRange === null ||
                (dateRange[0] === null && dateRange[1] === null)
              }
              onClick={() => {
                setDateRange(null);
                setFilteredDataSource(null);
                setShowTimestampModal(false);
              }}
            >
              Clear
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (
                  dateRange === null ||
                  (dateRange[0] === null && dateRange[1] === null)
                ) {
                  setFilteredDataSource(null);
                  setShowTimestampModal(false);
                } else {
                  const filteredData = dataSource.filter(
                    (row) =>
                      (dateRange[0]
                        ? row.timestamp.isAfter(dateRange[0])
                        : true) &&
                      (dateRange[1]
                        ? row.timestamp.isBefore(dateRange[1])
                        : true)
                  );
                  setFilteredDataSource(filteredData);
                  setShowTimestampModal(false);
                }
              }}
            >
              Filter
            </Button>
          </div>
        }
      >
        <div className="pt-4 pb-4">
          <DatePicker.RangePicker
            className="w-full"
            showTime
            allowEmpty={[true, true]}
            onChange={(
              dates: [start: Dayjs | null, end: Dayjs | null] | null
            ) => {
              setDateRange(dates);
            }}
            value={dateRange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DatasyncTable;
