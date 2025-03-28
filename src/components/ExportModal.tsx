import { useEffect, useState } from 'react';
import { Button, Typography, Modal, DatePicker } from 'antd';
import {
  DownloadOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { getAllFiles } from '../api/lib/datasync';

const { Title } = Typography;
const { RangePicker } = DatePicker;

type DownloadStatus = 'IDLE' | 'DOWNLOADING' | 'DONE' | 'ERROR';

const ExportModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('IDLE');

  useEffect(() => {
    if (showModal) {
      setDateRange(null);
    }
  }, [showModal]);

  const handleDateChange = (dates, dateString: [string, string]) => {
    setDateRange(dateString);
  };

  const getButtonIcon = () => {
    switch (downloadStatus) {
      case 'IDLE':
        return <DownloadOutlined />;
      case 'DOWNLOADING':
        return <LoadingOutlined className="mb-2" />;
      case 'DONE':
        return <CheckOutlined />;
      case 'ERROR':
        return <WarningOutlined />;
    }
  };

  const getFiles = async () => {
    try {
      setDownloadStatus('DOWNLOADING');
      const response = await getAllFiles({
        format: 'PDF',
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
        title="Export All Data"
        footer={
          <Button
            type="primary"
            loading={downloadStatus == 'DOWNLOADING'}
            icon={getButtonIcon()}
            onClick={getFiles}
          >
            Export
          </Button>
        }
      >
        <div className="p-8">
          <Title level={4}>Time Range</Title>
          <RangePicker onChange={handleDateChange} />
          <Title level={4} className="mt-4">
            Tables
          </Title>
        </div>
      </Modal>
    </div>
  );
};

export default ExportModal;
