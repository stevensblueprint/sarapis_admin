import { Button, Typography, Modal } from 'antd';
import {
  DownloadOutlined,
  PlusOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { getAllFiles, addNewFiles } from '../api/lib/datasync';
import Response from '../interface/Response';
import DatasyncTable from '../components/DatasyncTable';
import DatasyncSource from '../interface/model/DatasyncSource';
import { useRef, useState } from 'react';

const { Title, Text } = Typography;

type DownloadStatus = 'IDLE' | 'DOWNLOADING' | 'DONE' | 'ERROR';

const Datasync = () => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('IDLE');
  const [uploadData, setUploadData] = useState<DatasyncSource[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [deleteButtonStatus, setDeleteButtonStatus] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRowsSelected = (isRowSelected: boolean) => {
    setDeleteButtonStatus(isRowSelected);
  };

  const getFiles = async () => {
    try {
      setDownloadStatus('DOWNLOADING');
      const response = await getAllFiles();
      const data = response.data as Response<File>;

      if (data.contents) {
        const dataContents = data.contents;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataContents);
        link.download = 'datasync_export.zip';
        link.click();
      }
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

    const newDataSource: DatasyncSource = {
      id: '0',
      uuid: 'test user',
      request_type: 'Import',
      status: 'Failed',
      timestamp: currentTime,
      format: 'CSV',
      file_names: fileNames.join(', '),
      size: convertedFileSizes,
      status_message: 'files did not upload successfully',
    };

    setUploadData([newDataSource]);
  };

  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Data Sync
          </Title>
          <div>
            <Button
              type="primary"
              shape="round"
              className="mr-2"
              icon={<DeleteOutlined />}
              disabled={deleteButtonStatus}
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button
              onClick={handleUploadClick}
              type="primary"
              shape="round"
              className="mr-2"
              icon={<PlusOutlined />}
            />
            {/* TODO: add modal for upload that allows user to either drag and drop or select files from computer */}
            <Button
              type="primary"
              shape="round"
              icon={getDownloadButtonImage()}
              onClick={getFiles}
            />
          </div>
        </div>
        <DatasyncTable
          dataSource={uploadData}
          rowsSelected={handleRowsSelected}
        />
      </div>
    </div>
  );
};

export default Datasync;
