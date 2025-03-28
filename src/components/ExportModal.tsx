import { useEffect, useState } from 'react';
import { Button, Typography, Modal } from 'antd';

const { Title } = Typography;

const ExportModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  return (
    <div>
      <Modal
        open={showModal}
        onCancel={closeModal}
        title="Export All Data"
        footer={<Button type="primary">Export</Button>}
      >
        <div className="p-8">
          <Title level={4}>Time Range</Title>
          <Title level={4}>Tables</Title>
        </div>
      </Modal>
    </div>
  );
};

export default ExportModal;
