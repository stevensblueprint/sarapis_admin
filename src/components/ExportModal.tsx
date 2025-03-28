import { useEffect, useState } from 'react';
import { Button, Typography, Modal, DatePicker } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ExportModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  useEffect(() => {
    if (showModal) {
      setDateRange(null);
    }
  }, [showModal]);

  const handleDateChange = (dates, dateString: [string, string]) => {
    setDateRange(dateString);
  };

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
          <RangePicker onChange={handleDateChange} />
          <Title level={4} className="mt-4">
            Tables
          </Title>
        </div>
      </Modal>
    </div>
  );
};

export default ExportModal;
