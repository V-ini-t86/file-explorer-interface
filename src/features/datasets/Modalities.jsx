import { EyeOutlined, FolderOutlined, MoreOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

const Modalities = ({ modalityData }) => {
  const {
    device = {},
    tissueType = "",
    modality = "",
    physicalSpacing = 0,
    physicalSections = 0,
    pixelSize = 0,
    bitDepth = 0,
    isRegistered = false,
    channels = [],
    pyramidRegistrationStatus = "",
    createdAt = "",
    updatedAt = "",
  } = modalityData || {};

  const blocakFaceItems = [
    { name: 'Viewer Status', key: 1, value: "COMPLETED" },
    { name: 'Modality', key: 2, value: modality },
    { name: 'Physical Sections', key: 3, value: physicalSections },
    { name: 'Physical Spacing', key: 4, value: physicalSpacing },
    { name: 'Pixel size', key: 5, value: pixelSize },
    { name: 'Bit Depth', key: 6, value: bitDepth },
    { name: 'Channels', key: 7, value: channels.length },
  ];

  const maldiItems = [
    { name: 'Device Name', key: 1, value: device?.deviceName },
    { name: 'Tissue Type', key: 2, value: tissueType },
    // { name: 'Dataset', key: 5, value: dataset },
    // { name: 'Primary Data Set', key: 6, value: primaryDataSet },
    { name: 'Is Registered', key: 3, value: isRegistered ? 'Yes' : 'No' },
    { name: 'Pyramid Registration Status', key: 4, value: pyramidRegistrationStatus },
    { name: 'Created At', key: 5, value: new Date(createdAt).toLocaleDateString() },
    { name: 'Updated At', key: 6, value: new Date(updatedAt).toLocaleDateString() }
  ]

  const items = [
    {
      key: '1',
      label: <div className="flex items-center justify-between w-full">
        <span>BLOCKFACE</span>
        <div className="flex items-center space-x-2">
          <MoreOutlined />
          <EyeOutlined />
          <FolderOutlined />
        </div>
      </div>,
      children: <div className="space-y-2">
        {blocakFaceItems.map(item => (
          <div className="flex justify-between" key={item.key}>
            <span className="text-sm text-secondary-text">{item.name}</span>
            <span className="text-sm text-primary-text">{item.value}</span>
          </div>
        ))}

        {channels.length > 0 && (
          channels.map(channel => (
            <div className="bg-white rounded-lg" key={channel.channelNo}>
              <p className="flex justify-between text-sm text-primary-text">
                <span className='font-semibold'>Channel No.</span>
                <span>{channel?.num}</span>
              </p>
              <p className="flex justify-between text-sm text-primary-text">
                <span className='font-semibold'>Channel</span>
                <span>{channel?.name}</span>
              </p>
            </div>
          ))
        )}
      </div>,
    },
    {
      key: '2',
      label: <div className="flex items-center justify-between w-full">
        <span>MALDI</span>
        <div className="flex items-center space-x-2">
          <MoreOutlined />
          <EyeOutlined />
          <FolderOutlined />
        </div>
      </div>,
      children: <div className='space-y-2' key={2}>
        {maldiItems.map(item => (
          <div className="flex justify-between" key={item.key}>
            <span className="text-sm text-secondary-text">{item.name}</span>
            <span className="text-sm text-primary-text">{item.value}</span>
          </div>
        ))}
      </div>
      ,
    },
  ];

  return (
    <div>
      <p className='mb-3'>
        Modalities
      </p>
      <Collapse accordion
        items={items}
        defaultActiveKey={['1']}
        expandIconPosition='end'
      />
    </div>
  )
}

export default Modalities;