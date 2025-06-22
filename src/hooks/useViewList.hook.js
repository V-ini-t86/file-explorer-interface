import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cancelDownload, getDownloadProgress, getFileList, startDownload } from "../axios";
import { downloadFromS3Url, getFileNameFromDatasetKey } from "../utils/common.service";
import { usePolling } from "./common";

export const useViewList = (dataset = null) => {
  const { projectTitle, sponsorId } = useParams();
  const CONTAINER_HEIGHT = 400;

  const [fileList, setFileList] = useState({
    data: null,
    loading: false,
    error: null
  })
  const [downloads, setDownloads] = useState(new Map()) // Map<refId, {key, status, progress}>

  const fetchFileList = async () => {
    setFileList({ ...fileList, loading: true })
    try {
      const prefix = `${sponsorId}/${projectTitle}/${dataset}`
      const response = await getFileList(prefix);
      if (response.status !== 200) throw new Error('Failed to fetch file list')
      const keys = response.data?.data?.keys || [];
      const totalPage = Math.ceil(keys.length / 10);
      const data = { keys, currentPage: 1, pageSize: 10, totalPage };
      setFileList({ ...fileList, data: data, loading: false })
    } catch (error) {
      setFileList({ ...fileList, loading: false, error: error.message })
    }
  }

  const onScroll = (e) => {
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - CONTAINER_HEIGHT) <= 1
    ) {
      setFileList((prev) => {
        const nextPage = prev.data.currentPage + 1;
        return { ...prev, data: { ...prev.data, currentPage: nextPage } };
      });
    }
  }


  const watchDownloadProgress = async () => {
    const activeDownloads = Array.from(downloads.entries());

    for (const [refId, download] of activeDownloads) {
      try {
        const resp = await getDownloadProgress(refId);
        if (resp.status !== 200) continue;

        if (resp.data?.message === "COMPLETED") {
          const fileName = getFileNameFromDatasetKey(download.key, dataset);
          stopPolling(); // Stop polling when download is complete
          downloadFromS3Url(resp.data?.url, fileName);
          setDownloads(prev => {
            const newMap = new Map(prev);
            newMap.delete(refId);
            return newMap;
          });
        } else {
          setDownloads(prev => {
            const newMap = new Map(prev);
            newMap.set(refId, { ...download, ...resp.data });
            return newMap;
          });
        }
      } catch (error) {
        console.error(`Download progress error for ${refId}:`, error.message);
      }
    }
  }

  const { startPolling, stopPolling } = usePolling(watchDownloadProgress, 8000, downloads.size > 0);

  const downloadHandler = async (key) => {
    try {
      const files = [key];
      const resp = await startDownload(files);
      if (resp.status !== 200) throw new Error('Failed to start download');

      if (resp?.data?.ref) {
        setDownloads(prev => {
          const newMap = new Map(prev);
          newMap.set(resp.data.ref, { key, message: "STARTED", percentageCompleted: 0 });
          return newMap;
        });
        if (downloads.size === 0) startPolling();
      }
    } catch (error) {
      console.error("Download error:", error.message);
    }
  }

  const onCancelHandler = async (refId) => {
    try {
      if (!refId) {
        throw new Error("No active download found for refId:" + refId);
      }

      const resp = await cancelDownload(refId);
      if (resp.status !== 200) throw new Error('Failed to cancel download');
      setDownloads(prev => {
        const newMap = new Map(prev);
        newMap.delete(refId);
        return newMap;
      });
    } catch (error) {
      console.error("Cancel download error:", error.message);
    }
  }

  const getDownloadStatus = (key) => {
    return Array.from(downloads.values()).find(download => download.key === key);
  }

  const getRefIdByKey = (key) => {
    for (const [refId, download] of downloads.entries()) {
      if (download.key === key) return refId;
    }
    return null;
  }

  useEffect(() => {
    if (dataset) fetchFileList();
  }, [dataset])

  return {
    fileList,
    downloads,
    onScroll,
    downloadHandler,
    onCancelHandler,
    getDownloadStatus,
    getRefIdByKey
  }
}
