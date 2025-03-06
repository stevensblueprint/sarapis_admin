interface DatasyncSource {
  id: string; // Given by database
  uuid: string; // Who initiated the action
  request_type: string; // Import or Export
  status: string; // Status of upload - fail or success
  status_message: string; // If fail - message will display
  timestamp: string; // Time of the import/export
  format: string; // Format of files uploaded/exported
  file_names: string; // File names
  size: string; // Size of the dataset
}

export default DatasyncSource;
