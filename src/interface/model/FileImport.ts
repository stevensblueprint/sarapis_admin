interface FileImport {
  id: string;
  file_name: string;
  metadata_id: string | null;
  exchange_id: string;
}

export default FileImport;
