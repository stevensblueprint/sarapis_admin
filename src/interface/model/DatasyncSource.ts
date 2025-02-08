interface DatasyncSource {
  id: string; // Given by database
  request_type: string; // Import or Export
  timestamp: string; // Time of the import/export
  format: string; // Format of the data
  files: string; // File names of files imported
  size: string; // Size of the dataset
}

export default DatasyncSource;
