import { Table } from 'antd';

const DatasetTable = ({
  columns,
  dataSource,
  loading = false,
  selectedHash,
  onRowClick,
  className = "border-0",
  isPagination = false
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={isPagination ? {
      pageSize: 5,
      showSizeChanger: false,
      // pageSizeOptions: ['10', '20', '50', '100'],
      // showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`

    } : isPagination}
    size="small"
    className={className}
    rowClassName={(record) => `${record.hash === selectedHash ? '!bg-gray-300' : '!bg-white'} cursor-pointer border border-gray-300 rounded-lg p-2 text-gray-900 !rounded-lg !shadow-sm`}
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