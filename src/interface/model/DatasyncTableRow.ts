import { Dayjs } from 'dayjs';

interface DatasyncTableRow {
  id: string;
  timestamp: Dayjs;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: number | null;
  user_id: string;
  data_exchange_files: string[];
}

export default DatasyncTableRow;
