import { useEffect, useState } from 'react';
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
import { getAllActions } from '../api/lib/datasync';
import FileImport from '../interface/model/FileImport';

const { Title } = Typography;

const Datasync = () => {
  const [actionHistory, setActionHistory] = useState<DatasyncTableRow[]>([]);
  const [deleteButtonStatus, setDeleteButtonStatus] = useState<boolean>(true);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleRowsSelected = (rowsSelected: string[]) => {
    setIdsToDelete(rowsSelected);
    if (rowsSelected.length > 0) {
      setDeleteButtonStatus(false);
    } else {
      setDeleteButtonStatus(true);
    }
  };

  const getActionHistory = async () => {
    try {
      const response = await getAllActions();
      const convertedActionHistory: DatasyncTableRow[] = [];

      for (const item of [...response.data['contents']].reverse()) {
        const tableRow: DatasyncTableRow = {
          id: item.id,
          timestamp: item.timestamp,
          type: item.type == 'EXPORT' ? 'Export' : 'Import',
          success: item.success,
          error_message: item.error_message,
          format: item.format,
          size: item.size
            ? item.size < 1000000
              ? (item.size / 1000).toFixed(2).toString() + ' KB'
              : (item.size / 1000000).toFixed(2).toString() + ' MB'
            : '',
          user_id: item.user_id,
          file_imports: item.file_imports.map(
            (file: FileImport) => file.fileName
          ),
        };

        convertedActionHistory.push(tableRow);
      }

      setActionHistory(convertedActionHistory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActionHistory();
  }, []);

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
              closeModal={() => {
                setShowImportModal(false);
                getActionHistory();
              }}
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
              closeModal={() => {
                setShowExportModal(false);
                getActionHistory();
              }}
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
