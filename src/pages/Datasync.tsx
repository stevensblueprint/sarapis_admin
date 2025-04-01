import { useRef, useState } from 'react';
import { Button, Typography } from 'antd';
import {
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import DatasyncTable from '../components/DatasyncTable';
import DatasyncTableRow from '../interface/model/Datasync';
import ExportModal from '../components/ExportModal';
import ImportModal from '../components/ImportModal';

const { Title } = Typography;

const Datasync = () => {
  const [deleteButtonStatus, setDeleteButtonStatus] = useState<boolean>(true);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleRowsSelected = (rowsSelected: string[]) => {
    setIdsToDelete(rowsSelected);
    console.log(rowsSelected);
    if (rowsSelected.length > 0) {
      setDeleteButtonStatus(false);
    } else {
      setDeleteButtonStatus(true);
    }
  };

  return (
    <div>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <Title className="mb-4" level={3}>
            Data Sync
          </Title>
          <div className="flex flex-row">
            <Button
              className="mr-2"
              onClick={() => setShowImportModal(true)}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
            />
            <ImportModal
              showModal={showImportModal}
              closeModal={() => setShowImportModal(false)}
            ></ImportModal>
            {/* TODO: add modal for upload that allows user to either drag and drop or select files from computer */}
            <Button
              className="mr-2"
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
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
        <DatasyncTable dataSource={[]} rowsSelected={handleRowsSelected} />
      </div>
    </div>
  );
};

export default Datasync;
