# File Explorer Dataset Manager

A React-based dataset management application for viewing and managing file collections with advanced filtering, grouping, and download capabilities.

## 📦 Packages Used

### Core Dependencies
- **React Router DOM** (^7.6.2) - Client-side routing
- **Ant Design** (^5.26.1) - UI component library
- **Axios** (^1.10.0) - HTTP client for API calls
- **rc-virtual-list** (^3.19.1) - Virtual scrolling for large lists


## 🚀 Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## ⚙️ Project Configuration

### Project Structure
```
src/
├── component/          # Reusable UI components
├── features/           # Feature-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── theme/              # Theme configurations
├── utils/              # Utility functions
└── axios/              # API configuration
```

## 🔧 Key Features

- **Dataset Management**: View and manage large datasets
- **File Operations**: Download files with progress tracking
- **Advanced Filtering**: Filter by gender etc.
- **Grouping**: Group datasets by various criteria
- **Virtual Scrolling**: Handle large file lists efficiently
- **Real-time Updates**: Polling for download progress

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
