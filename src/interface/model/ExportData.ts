interface ExportData {
  id: string; // ID - given by database
  format: string; // Format of data (?)
  mode: string; // ?
  last_import: string; // ?
  actions: string; // Actions available for this dataset
}

export default ExportData;
