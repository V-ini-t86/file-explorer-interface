import { CloseOutlined, DownloadOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, List, Progress, Spin, Tooltip } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useViewList } from "../../hooks";
import { formatFileSize, getFileNameFromDatasetKey } from '../../utils/common.service';

const ViewFileList = ({ dataset }) => {
  const { 
    fileList, 
    onScroll, 
    downloadHandler, 
    getDownloadStatus, 
    onCancelHandler, 
    getRefIdByKey 
  } = useViewList(dataset);

  if (fileList.loading) return (
    <div
      className="text-secondary-text text-center !h-[400] flex flex-col items-center justify-center"
      style={{ height: "400px" }}
    >
      <Spin size="large" />
    </div>
  );

  if (fileList.error) return <p className="text-red-500">Error: {fileList.error}</p>;

  return (
    <>
      {fileList.data?.keys?.length === 0 ? (
        <div
          className="text-secondary-text text-center !h-[400] flex flex-col items-center justify-center"
          style={{ height: "400px" }}
        >
          <InboxOutlined className="text-6xl mb-4 text-gray-300" />
          <p>No files found for this dataset.</p>
        </div>
      ) : (
        <List>
          <VirtualList
            data={fileList.data?.keys ? fileList?.data?.keys?.slice(0, fileList.data.currentPage * fileList.data.pageSize) : []}
            height={400}
            itemHeight={47}
            itemKey="list-item"
            onScroll={onScroll}
          >
            {(item) => {
              const title = getFileNameFromDatasetKey(item?.key, dataset);
              const downloadStatus = getDownloadStatus(item?.key);
              return (
                <List.Item key={item?.key} className='mr-4'>
                  <List.Item.Meta
                    avatar={<FileOutlined className="text-xl text-gray-500" />}
                    title={title}
                    description={formatFileSize(item.size)}
                  />
                  <Button
                    type="text"
                    icon={<DownloadOutlined width={32} height={32} />}
                    className="text-primary-text"
                    title='Download'
                    onClick={() => downloadHandler(item?.key)}
                    disabled={downloadStatus?.key === item?.key && downloadStatus.message !== "COMPLETED"}
                  />

                  {
                    downloadStatus?.key === item?.key && downloadStatus.message !== "COMPLETED" &&
                    <>
                      <Tooltip title={downloadStatus.message}>
                        <Progress
                          className='mr-2'
                          type="circle"
                          size={40}
                          strokeWidth={2}
                          percent={downloadStatus.percentageCompleted}
                          status={"active"}
                          trailColor="rgba(0, 0, 0, 0.06)"
                        />
                      </Tooltip>
                      <Button
                        icon={<CloseOutlined />}
                        type='text'
                        onClick={() => onCancelHandler(getRefIdByKey(item?.key))}
                        title='Cancel Download'
                      />
                    </>
                  }
                </List.Item>
              )
            }}
          </VirtualList>
        </List>
      )}
    </>
  )
}

export default ViewFileList