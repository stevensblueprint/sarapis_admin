import { useEffect, useState } from 'react';
import { Button, Typography, Modal, DatePicker, Select, Dropdown } from 'antd';
import {
  DownloadOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { getAllFiles } from '../api/lib/datasync';
import type { SelectProps, MenuProps } from 'antd';
import { Dayjs } from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

type DownloadStatus = 'IDLE' | 'DOWNLOADING' | 'DONE' | 'ERROR';

const tableOptions: SelectProps['options'] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const ExportModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [dateRange, setDateRange] = useState<
    [start: Dayjs | null, end: Dayjs | null] | null
  >(null);
  const [dateRangeString, setDateRangeString] = useState<
    [string | null, string | null] | null
  >(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('IDLE');
  const [selectedTableOptions, setSelectedTableOptions] = useState<
    (string | number | null | undefined)[]
  >([]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => getFiles('CSV')}>CSV</span>,
    },
    {
      key: '2',
      label: <span onClick={() => getFiles('PDF')}>PDF</span>,
    },
  ];

  useEffect(() => {
    if (showModal) {
      setDateRange(null);
      setDateRangeString(null);
      setSelectedTableOptions([]);
    }
  }, [showModal]);

  const handleDateChange = (
    dates: [start: Dayjs | null, end: Dayjs | null] | null,
    dateString: [string | null, string | null] | null
  ) => {
    setDateRange(dates);
    setDateRangeString(dateString);
    console.log(dateString);
  };

  const handleTableSelectChange = (
    selection: (string | number | null | undefined)[]
  ) => {
    setSelectedTableOptions(selection);
  };

  const getButtonIcon = () => {
    switch (downloadStatus) {
      case 'IDLE':
        return <DownloadOutlined />;
      case 'DOWNLOADING':
        return <LoadingOutlined />;
      case 'DONE':
        return <CheckOutlined />;
      case 'ERROR':
        return <WarningOutlined />;
    }
  };

  const getFiles = async (format: string) => {
    try {
      console.log(selectedTableOptions);
      setDownloadStatus('DOWNLOADING');
      const response = await getAllFiles({
        format: format,
        user_id: 'test',
      });
      const blob = new Blob([response.data], { type: 'application/zip' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'datasync_export.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();

      setDownloadStatus('DONE');
      setTimeout(() => {
        setDownloadStatus('IDLE');
      }, 3000);
    } catch (error) {
      setDownloadStatus('ERROR');
      console.log(error);
      setTimeout(() => {
        setDownloadStatus('IDLE');
      }, 3000);
    }
  };

  return (
    <div>
      <Modal
        open={showModal}
        onCancel={closeModal}
        title="Export Data"
        footer={
          <Dropdown menu={{ items }}>
            <Button
              type="primary"
              loading={downloadStatus == 'DOWNLOADING'}
              icon={getButtonIcon()}
            >
              Export
            </Button>
          </Dropdown>
        }
      >
        <div className="p-8">
          <Title level={3}>Time Range</Title>
          <RangePicker
            className="w-[100%]"
            format="MMMM DD, YYYY"
            onChange={handleDateChange}
            value={dateRange}
          />
          <div>
            <Title level={3} className="mt-8">
              Tables
            </Title>
          </div>
          <div className="flex flex-row gap-2">
            <Select
              className="w-[100%]"
              mode="multiple"
              placeholder="Select Tables..."
              options={tableOptions}
              onChange={handleTableSelectChange}
              value={selectedTableOptions}
              allowClear
            />
            <Button
              onClick={() =>
                handleTableSelectChange(
                  tableOptions.map((option) => option.value)
                )
              }
            >
              Add All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExportModal;
