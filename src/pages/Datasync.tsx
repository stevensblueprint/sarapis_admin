import { Button, Typography, Modal } from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllFiles, addNewFiles } from '../api/lib/datasync';
import Response from '../interface/Response';
import DatasyncTable from '../components/DatasyncTable';
import DatasyncSource from '../interface/model/DatasyncSource';
import { useRef, useState } from 'react';

const { Title, Text } = Typography;

type DownloadStatus = 'IDLE' | 'LOADING' | 'DONE' | 'ERROR';

const Datasync = () => {
  const [uploadData, setUploadData] = useState<DatasyncSource[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getFiles = async () => {
    try {
      const response = await getAllFiles();
      const data = response.data as Response<File>;
      return data;
    } catch (error) {
      console.log(error);
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
    const currentTime: string = now.toLocaleTimeString();
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
      request_type: 'Import',
      timestamp: currentTime,
      format: 'CSV',
      files: fileNames.join(', '),
      size: convertedFileSizes,
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
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              onClick={getFiles()}
            />
          </div>
        </div>
        <DatasyncTable dataSource={uploadData} />
      </div>
    </div>
  );
};

export default Datasync;
