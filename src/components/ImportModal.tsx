import { Modal, Button, Typography, Upload, UploadFile } from 'antd';
import { useState, useEffect } from 'react';
import type { UploadProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const ImportModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  const deleteFile = (index: number) => {
    setFileList((prevFileList) => prevFileList.filter((_, i) => i !== index));
  };

  const cancelUpload = () => {
    setFileList([]);
  };

  useEffect(() => {
    if (showModal) {
      setFileList([]);
    }
  }, [showModal]);

  return (
    <div>
      <Modal
        open={showModal}
        onCancel={closeModal}
        footer={
          <div>
            {fileList.length != 0 && (
              <div className="flex flex-row justify-between">
                <Button onClick={cancelUpload} danger>
                  Cancel
                </Button>
                <Button type="primary">Upload</Button>
              </div>
            )}
          </div>
        }
      >
        <div className="mt-8">
          {fileList.length == 0 && (
            <Dragger
              showUploadList={false}
              multiple={true}
              onChange={handleUpload}
            >
              <div className="p-20 flex flex-col items-center hover:cursor-pointer">
                <Title level={4} className="!text-gray-600">
                  Drag and Drop files
                </Title>
                <Text className="!text-gray-500">
                  Or{' '}
                  <a
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    upload from Google Drive
                  </a>
                </Text>
              </div>
            </Dragger>
          )}
          {fileList.length != 0 && (
            <div>
              <Title level={4} className="pl-4">
                Upload Files
              </Title>
              <div className="p-4 pl-8 pr-4 flex flex-col gap-2 overflow-scroll rounded-lg bg-gray-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-h-[300px]">
                {fileList.map((file, index) => {
                  return (
                    <div
                      className="flex flex-row justify-between items-center w-full"
                      key={index}
                    >
                      <p className="truncate">{file.originFileObj?.name}</p>
                      <Button
                        className="!border-0 !shadow-none !bg-transparent"
                        shape="round"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteFile(index)}
                        danger
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ImportModal;
