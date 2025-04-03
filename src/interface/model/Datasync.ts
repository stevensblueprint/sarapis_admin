interface DatasyncTableRow {
  id: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: string;
  user_id: string;
  file_imports: string[];
}

export default DatasyncTableRow;
