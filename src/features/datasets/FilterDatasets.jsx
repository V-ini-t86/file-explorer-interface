import { Input, Select, Button, Tooltip } from 'antd'
import { SearchOutlined, FilterOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import React from 'react'

const { Option } = Select

const FilterDatasets = ({
  onChangeTitle,
  groupBy,
  onSelectFilterBy,
  viewType,
  changeViewType,
  onChangeGroupBy
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Input
        placeholder="Search by Title/Animal ID"
        prefix={<SearchOutlined className="text-secondary-text" />}
        className="w-64"
        size="middle"
        onChange={(e) => onChangeTitle(e)}
      />

      <Tooltip title='Group By' >
        <Select
          placeholder="Group By"
          className="w-32"
          size="middle"
          suffixIcon={<FilterOutlined className="text-secondary-text" />}
          value={groupBy}
          onChange={onChangeGroupBy}
        >
          <Option value="none">None</Option>
          <Option value="gender">Gender</Option>
        </Select>
      </Tooltip>

      <Tooltip title='Filter By' >
        <Select
          placeholder="Filter By"
          className="w-32"
          size="middle"
          onSelect={(value) => onSelectFilterBy(value)}
        >
          <Option value="">None</Option>
          <Option value="M">Male</Option>
          <Option value="F">Female</Option>
        </Select>
      </Tooltip>

      <div className="flex border border-secondary-border rounded-lg w-auto">
        <Tooltip title='Grid View' placement="top">
          <Button
            type="text"
            size="middle"
            className={`px-2 ${viewType === 'grid' ? 'bg-secondary-card' : ''}`}
            onClick={() => changeViewType('grid')}
          >
            <AppstoreOutlined />
          </Button>
        </Tooltip>
        <Tooltip title='List View' placement="top">
          <Button
            type="text"
            size="middle"
            className={`px-2 ${viewType === 'list' ? 'bg-secondary-card' : ''}`}
            onClick={() => changeViewType('list')}
          >
            <UnorderedListOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default FilterDatasets