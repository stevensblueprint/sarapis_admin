import { Modal, Button, Typography, Upload, UploadFile, message } from 'antd';
import { useState, useEffect } from 'react';
import type { UploadProps } from 'antd';

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
          <Button type="primary" disabled={fileList.length == 0}>
            Upload
          </Button>
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
              {fileList.map((file) => {
                return <p>{file.originFileObj.name}</p>;
              })}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ImportModal;
