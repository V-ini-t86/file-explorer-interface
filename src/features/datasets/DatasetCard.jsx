import { Card } from 'antd';

const DatasetCard = ({ record, onClick, loading = false }) => (
  <Card
    className="cursor-pointer hover:shadow-md transition-shadow"
    onClick={() => onClick(record?.hash)}
    loading={loading}
  >
    <div className="space-y-2">
      <h3 className="text-primary-text font-medium">{record.title}</h3>
      <p className="text-secondary-text text-sm">Animal ID: <span className='text-primary-text'>{record.animalId}</span></p>
      <p className="text-secondary-text text-sm">Block ID: <span className='text-primary-text'>{record.blockId}</span></p>
      <p className="text-secondary-text text-sm">Modality: <span className='text-primary-text'>{record.modality}</span></p>
      <p className="text-secondary-text text-sm">Sex: <span className='text-primary-text'>{record?.attributes?.sex === "M" ? "Male" : "Female"}</span></p>
    </div>
  </Card>
);

export default DatasetCard;