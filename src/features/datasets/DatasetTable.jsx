import { Table } from 'antd';

const DatasetTable = ({ 
  columns, 
  dataSource, 
  loading = false, 
  selectedHash, 
  onRowClick,
  className = "border-0"
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={false}
    size="small"
    className={className}
    rowClassName={(record) => {
      return `${record.hash === selectedHash ? 'bg-gray-300' : ''} cursor-pointer bg-white border border-gray-300 rounded-lg p-2 text-gray-900`
    }}
    loading={loading}
    onRow={(record) => ({
      onClick: () => {
        if (record.hash === selectedHash) return;
        onRowClick(record.hash);
      },
    })}
  />
);

export default DatasetTable;