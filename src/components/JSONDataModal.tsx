import { Modal } from 'antd';
import { prettyPrintJson } from 'pretty-print-json';

const JSONDataModal = ({
  showModal,
  closeModal,
  data,
}: {
  showModal: boolean;
  closeModal: () => void;
  data: object;
}) => {
  const html = prettyPrintJson.toHtml(data);

  return (
    <div>
      <Modal
        open={showModal}
        onCancel={closeModal}
        title="Detailed Information"
        footer={null}
      >
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Modal>
    </div>
  );
};

export default JSONDataModal;
