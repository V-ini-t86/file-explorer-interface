import { Card, Typography } from 'antd';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../component/layout/Header';
import CardDataset from '../features/datasets/CardDataset';
import FilterDatasets from '../features/datasets/FilterDatasets';
import DatasetCard from '../features/datasets/DatasetCard';
import DatasetTable from '../features/datasets/DatasetTable';
import { datasetColumns } from '../columns.const';
import DatasetPagination from '../features/datasets/DatasetPagination';
import { useDatasets } from '../hooks';

const { Title } = Typography;

const DatasetManager = () => {
  const location = useLocation();
  const [viewType, setViewType] = useState('list');
  const [groupBy, setGroupBy] = useState('none');

  const { projectTitle, sponsorId } = useParams();

  const {
    datasets,
    datasetDetails,
    fetchDatasetDetails,
    onPageChange,
    onSelectFilterBy,
    onChangeTitle
  } = useDatasets(projectTitle, sponsorId);

  const { data, loading } = datasets;
  const folderName = location.state?.folderName || 'Dataset Collection';

  const currentPage = data?.currentPage || 1;

  const changeViewType = (type) => setViewType(type);
  const onChangeGroupBy = (value) => setGroupBy(value);


  return (
    <div className="min-h-screen bg-primary-bg">
      <Header folderName={folderName} />

      {/* Main Content */}
      <div className="p-6 flex flex-col lg:flex-row justify-between lg:space-x-2 space-y-4 lg:space-y-0">
        <Card className="bg-white border border-secondary-border rounded-system shadow-sm flex-1">
          {/* Tabs and Controls */}
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <Title level={4} className="text-primary-text mb-0">
                Datasets
              </Title>
            </div>

            <FilterDatasets
              onChangeTitle={onChangeTitle}
              groupBy={groupBy}
              onSelectFilterBy={onSelectFilterBy}
              viewType={viewType}
              changeViewType={changeViewType}
              onChangeGroupBy={onChangeGroupBy}
            />
          </div>

          {/* Content */}
          <div className="overflow-x-auto">
            {groupBy === 'gender' ? (
              <div className="space-y-6">
                {['M', 'F'].map(gender => {
                  const filteredData = (data?.data || []).filter(record => record?.attributes?.sex === gender);
                  if (filteredData.length === 0) return null;

                  return (
                    <div key={gender}>
                      <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold text-primary-text mr-4">
                          {gender === 'M' ? 'Male' : 'Female'}
                        </h3>
                        <div className="flex-1 h-px bg-secondary-border"></div>
                      </div>

                      {viewType === 'list' ? (
                        <DatasetTable
                          columns={datasetColumns}
                          dataSource={filteredData}
                          selectedHash={datasetDetails?.data?.hash}
                          onRowClick={fetchDatasetDetails}
                          className="border-0 mb-6"
                          isPagination={true}
                        />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {filteredData.map((record) => (
                            <DatasetCard
                              key={record.hash}
                              record={record}
                              onClick={fetchDatasetDetails}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              viewType === 'list' ? (
                <DatasetTable
                  columns={datasetColumns}
                  dataSource={data?.data || []}
                  loading={loading}
                  selectedHash={datasetDetails?.data?.hash}
                  onRowClick={fetchDatasetDetails}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(data?.data || []).map((record) => (
                    <DatasetCard
                      key={record.hash}
                      record={record}
                      onClick={fetchDatasetDetails}
                      loading={loading}
                    />
                  ))}
                </div>
              )
            )}
          </div>


          <DatasetPagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            onPageChange={onPageChange}
          />

        </Card>

        {/* Right Panel */}
        <div className="w-full lg:w-80">
          <CardDataset datasetDetails={datasetDetails} />
        </div>
      </div>
    </div>
  );
};

export default DatasetManager;