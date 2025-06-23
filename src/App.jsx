import { ConfigProvider } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DatasetManager from './pages/DatasetManager';
import Home from './pages/Home';
import { antdTheme } from './theme/antdTheme';
import Error404 from './pages/Error404';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataset-manager/:projectTitle/:sponsorId" element={<DatasetManager />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;