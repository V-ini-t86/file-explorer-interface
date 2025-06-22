import { dataset } from "../axios.config"

export const getDatasetDetails = (hashKey) => {
  return dataset({
    method: "GET",
    url: `/dataset/${hashKey}`,
  })
}

export const getFileList = (prefix, pageToken = "") => {
  const params = { prefix }
  if (pageToken) params.pageToken = pageToken
  return dataset({
    method: "GET",
    url: `/manage/files`,
    params,
  })
}

export const getDownloadProgress = (refId) => {
  return dataset({
    method: "GET",
    url: `/download/progress/${refId}`,
  })
}

export const startDownload = (files = [], folder = "") => {
  const data = { files }
  if (folder) data.folder = folder
  return dataset({
    method: "POST",
    url: `/download`,
    data: data,
  })
}

export const cancelDownload = (refId) => {
  return dataset({
    method: "POST",
    url: `/download/cancel`,
    data: { refId },
  })
}

export const filterDataset = (projectId, sponsorId, filterObj, page = 1, limit = 10,) => {
  return dataset({
    method: "POST",
    url: `/dataset/${projectId}`,
    params: { sponsorId, page, limit },
    data: filterObj,
  })
}


