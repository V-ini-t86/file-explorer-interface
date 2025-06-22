export const downloadFromS3Url = (url, fileName) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const getFileNameFromDatasetKey = (key, dataset) => {
  const title = key?.split("/")[3] || "Untitled File";
  return dataset?.length ? title.slice(dataset?.length + 1) : title;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};