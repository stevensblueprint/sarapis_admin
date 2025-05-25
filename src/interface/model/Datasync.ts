interface DatasyncTableRow {
  id: string;
  timestamp: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: string;
  user_id: string;
  data_exchange_files: string[];
}

export default DatasyncTableRow;
