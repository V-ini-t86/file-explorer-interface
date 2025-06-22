import { Button } from 'antd';

const DatasetPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-border">
      <div className="text-sm text-secondary-text">
        Page {currentPage} of {totalPages || 1}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="small"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title='Previous Page'
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 12l-4-4 4-4v8z" />
          </svg>
        </Button>
        <Button
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title='Next Page'
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 4l4 4-4 4V4z" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default DatasetPagination;