interface ImportData {
  id: string; // ID - given by database
  timestamp: string; // When data was uploaded
  source: string; // List file names of uploaded files
  size: string; // Size of all files uploaded
  status: string; // Success/Fail
}

export default ImportData;
