import { FolderOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

const Header = ({ folderName = "", showBreadcrumb = true }) => {
  const navigate = useNavigate();
  const items = [
    {
      title: (
        <Button
          type="text"
          icon={<HomeOutlined />}
          onClick={() => navigate('/')}
          className="text-secondary-text hover:text-primary-text"
        >
          Home
        </Button>
      )
    },
    {
      title: (
        <>
          <FolderOutlined className="mr-1" />
          {folderName}
        </>
      )
    }
  ];
  return (
    <header className="bg-white border-b px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <Title
          level={4}
          className="mb-0 text-primary-text cursor-pointer"
          onClick={() => navigate('/')}
        >
          Data Manager
        </Title>

        {showBreadcrumb && (
          <Breadcrumb
            className="text-secondary-text flex items-center"
            items={items}
          />
        )}
      </div>
    </header>
  )
}

export default Header;