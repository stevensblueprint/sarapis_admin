import FileImport from './FileImport';

interface Exchange {
  id: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: number | null;
  user_id: string;
  file_imports: FileImport[];
}

export default Exchange;
