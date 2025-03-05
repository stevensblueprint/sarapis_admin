import DatasyncSource from '../interface/model/DatasyncSource';
import { Table, Modal } from 'antd';
import { useState } from 'react';

const DatasyncTable = ({
  dataSource,
}: {
  dataSource: DatasyncSource[] | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'User',
      dataIndex: 'uuid',
      width: 150,
    },
    {
      title: 'Request Type',
      dataIndex: 'request_type',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      render: (status: string, record: DatasyncSource) => {
        return status !== 'Success' ? (
          <div>
            <span
              style={{ cursor: 'pointer', color: '#1890ff' }}
              onClick={showModal}
            >
              {status}
            </span>
            <Modal
              open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
              title="Error"
            >
              <p>{record.status_message}</p>
            </Modal>
          </div>
        ) : (
          <span>{status}</span>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      width: 200,
    },
    {
      title: 'Format',
      dataIndex: 'format',
      width: 150,
    },
    {
      title: 'Files',
      dataIndex: 'file_names',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width: 150,
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default DatasyncTable;
