import { useRef, useState } from 'react';
import { Button, Typography } from 'antd';
import {
  DownloadOutlined,
  PlusOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  getAllFiles,
  addNewFiles,
  getAllActions,
  deleteFiles,
} from '../api/lib/datasync';
import DatasyncTable from '../components/DatasyncTable';
import DatasyncTableRow from '../interface/model/Datasync';
import ExportModal from '../components/ExportModal';

const { Title, Text } = Typography;

type DownloadStatus = 'IDLE' | 'DOWNLOADING' | 'DONE' | 'ERROR';

const Datasync = () => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('IDLE');
  const [actionHistory, setActionHistory] = useState<DatasyncTableRow[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [deleteButtonStatus, setDeleteButtonStatus] = useState<boolean>(true);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleRowsSelected = (rowsSelected: string[]) => {
    setIdsToDelete(rowsSelected);
    console.log(rowsSelected);
    if (rowsSelected.length > 0) {
      setDeleteButtonStatus(false);
    } else {
      setDeleteButtonStatus(true);
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

  const getDownloadButtonImage = () => {
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(newFiles);
      handleUploadedData(newFiles);
    }
  };

  const handleUploadedData = (newFiles: File[]) => {
    const now: Date = new Date();
    const currentTime: string =
      now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    const fileNames: string[] = [];
    let fileSizes = 0;

    newFiles.forEach((file: File) => {
      fileNames.push(file.name);
      fileSizes += file.size;
    });

    const convertedFileSizes =
      fileSizes < 1000000
        ? (fileSizes / 1000).toFixed(2).toString() + ' KB'
        : (fileSizes / 1000000).toFixed(2).toString() + ' MB';

    const newDataSource: DatasyncTableRow = {
      id: '0',
      uuid: 'test user',
      request_type: 'Export',
      status: 'Success',
      timestamp: currentTime,
      format: 'CSV',
      file_names: fileNames.join(', '),
      size: convertedFileSizes,
      status_message: 'files did not upload successfully',
    };

    setActionHistory([newDataSource]);
  };

  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Data Sync
          </Title>
          <div className="flex flex-row">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button
              className="mr-2"
              onClick={handleUploadClick}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
            />
            {/* TODO: add modal for upload that allows user to either drag and drop or select files from computer */}
            <Button
              className="mr-2"
              type="primary"
              shape="round"
              icon={getDownloadButtonImage()}
              onClick={() => setShowExportModal(true)}
            />
            <ExportModal
              showModal={showExportModal}
              closeModal={() => setShowExportModal(false)}
            />
            <Button
              shape="round"
              icon={<DeleteOutlined />}
              disabled={deleteButtonStatus}
              danger
            />
          </div>
        </div>
        <DatasyncTable
          dataSource={actionHistory}
          rowsSelected={handleRowsSelected}
        />
      </div>
    </div>
  );
};

export default Datasync;
