import { FolderOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../component/layout/Header';

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const folders = [
    {
      id: 1,
      name: 'Dataset Collection : 000-0-001',
      type: 'folder',
      itemCount: 15,
      description: 'Primary research datasets',
      projectTitle: "000-0-001",
      sponsorId: "INTRW-000"
    },
    // {
    //   id: 2,
    //   name: 'Dataset Collection : 000-0-002',
    //   type: 'folder',
    //   itemCount: 8,
    //   description: 'Secondary analysis datasets',
    //   projectTitle: "000-0-002",
    //   sponsorId: "INTRW-000"
    // },
  ];

  const handleFolderClick = (folder) => {
    navigate(`/dataset-manager/${folder.projectTitle}/${folder.sponsorId}`, {
      state: {
        folderName: folder.name
      }
    });
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header showBreadcrumb={false} />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Title level={3} className="text-primary-text mb-2">
              Folders
            </Title>
            <p className="text-secondary-text">
              Select a folder to view and manage datasets
            </p>
          </div>

          <Row gutter={[16, 16]}>
            {folders.map((folder) => (
              <Col xs={24} sm={12} md={8} lg={6} key={folder.id}>
                <Card
                  className="bg-white rounded-md hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleFolderClick(folder)}
                  hoverable
                >
                  <div className="text-center p-4">
                    <div className="mb-4">
                      <FolderOutlined
                        className="text-secondary-text"
                        style={{ fontSize: '48px' }}
                      />
                    </div>

                    <Title level={5} className="text-primary-text mb-2">
                      {folder.name}
                    </Title>

                    <p className="text-secondary-text text-sm mb-3">
                      Sponsor ID: {folder?.sponsorId}
                    </p>

                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;