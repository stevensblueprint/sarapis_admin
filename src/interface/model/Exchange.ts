import FileImport from './FileImport';

interface ActionLog {
  id: string;
  timestamp: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: number | null;
  user_id: string;
  file_imports: FileImport[];
}

interface Exchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: ActionLog[];
}

export type { ActionLog, Exchange };
