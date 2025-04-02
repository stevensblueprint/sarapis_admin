import FileImport from './FileImport';

interface DatasyncTableRow {
  id: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: bigint | null;
  user_id: string;
  file_imports: FileImport[];
}

export default DatasyncTableRow;
