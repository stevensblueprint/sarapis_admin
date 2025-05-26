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
import { ActionLog } from '../interface/model/Exchange';
import Navbar from '../components/Navbar';

const { Title } = Typography;

const formatFileSize = (size: number | null): string => {
  if (!size) return '';
  return size < 1000000
    ? `${(size / 1000).toFixed(2)} KB`
    : `${(size / 1000000).toFixed(2)} MB`;
};

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
      console.log(idsToDelete);
    } else {
      setDeleteButtonStatus(true);
    }
  };

  const getActionHistory = async () => {
    setActionHistory([]);

    try {
      let page_number = 1;
      let allRows: DatasyncTableRow[] = [];

      while (true) {
        const response = await getAllActions({ page: page_number - 1 });

        const items: ActionLog[] = [...response.data.contents].reverse();

        const rows: DatasyncTableRow[] = items.map((item) => ({
          id: item.id,
          timestamp: item.timestamp,
          type: item.type === 'EXPORT' ? 'Export' : 'Import',
          success: item.success,
          error_message: item.error_message,
          format: item.format,
          size: formatFileSize(item.size),
          user_id: item.user_id,
          data_exchange_files: item.data_exchange_files.map(
            (file: FileImport) => file.file_name
          ),
        }));

        allRows = [...allRows, ...rows.reverse()];

        if (response.data.lastPage) {
          break;
        } else {
          page_number += 1;
        }
      }

      setActionHistory(allRows);
    } catch (error) {
      console.error('Failed to fetch action history:', error);
    }
  };

  useEffect(() => {
    getActionHistory();
  }, []);

  return (
    <div>
      <Navbar />
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
