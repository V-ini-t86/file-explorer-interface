import { Button, Card, Modal, Tooltip } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import Modalities from './Modalities';
import { useState } from 'react';
import ViewFileList from './ViewFileList';

const CardDataset = ({ datasetDetails }) => {
  const { data, loading } = datasetDetails || {};
  const [isModalOpen, setIsModalOpen] = useState(false);


  if (!data && !loading) {
    return (
      <div className="w-full">
        <Card className="bg-white border border-secondary-border rounded-system shadow-sm">
          <Title level={5} className="text-primary-text mb-2">No Dataset Selected</Title>
          <p className="text-sm text-secondary-text mb-3">
            Please select a dataset to view its details.
          </p>
        </Card>
      </div>
    )
  }


  if (!data && loading) {
    return (
      <div className="w-full">
        <Card className="bg-white border border-secondary-border rounded-system shadow-sm" loading={true} />
      </div>
    )
  }

  const {
    title = "",
    description = "",
    blockId = "",
    animalId = "",
    dataset = "",
    ...modalityData
  } = data || {};


  const showModal = () => setIsModalOpen(true);

  const handleOk = () => setIsModalOpen(false);

  const handleCancel = () => setIsModalOpen(false);


  return (
    <div className="w-full">
      <Card
        className="bg-white border border-secondary-border rounded-system shadow-sm relative"
        loading={loading}
      >
        <Tooltip title='View File List' placement="left">
          <Button
            type="text" icon={<FileTextOutlined />}
            className="absolute top-4 right-4"
            onClick={showModal}
          />
        </Tooltip>
        <div className="space-y-4">
          <div>
            <Title level={5} className="text-primary-text mb-2">{title}</Title>
            <p className="text-sm text-secondary-text mb-3">
              {description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-text">Animal ID</span>
              <span className="text-sm text-primary-text">{animalId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-text">Block ID</span>
              <span className="text-sm text-primary-text">{blockId}</span>
            </div>
            <Modalities modalityData={modalityData} />
          </div>
        </div>
      </Card>

      <Modal
        title={`Dataset : ${dataset}`}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ViewFileList dataset={dataset} />
      </Modal>
    </div>
  )
}

export default CardDataset