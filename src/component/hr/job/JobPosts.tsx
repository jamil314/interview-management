import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { InputRef, Tooltip, notification } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, ColumnsType, FilterValue, SorterResult  } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import data from "../../../../Dummy/DummyJobs.js";

import hr from '../hr.module.scss'

import JobCard from './JobCard';
import AddJob from './AddJob';
import TopBar from '../TopBar';
import AddPosition from './AddPosition';

interface DataType {
    id: string;
    Position: string;
    Salary: string;
    Opening: string;
    Applicants: string;
    Deadline: string;
}

type DataIndex = keyof DataType;


const JobPosts: React.FC = () => {

  const [focusJob, setFocusJob] = useState<null | string>(null);
  const [createJob, setCreateJob] = useState(false);
  const [createPosition, setCreatePosition] = useState(false);


  const [api, contextHolder] = notification.useNotification();

  const jobCreationStatus = ( action : string) => {
    closeCreateJob();
    switch (action) {
      case 'Draft':
        api.success({
          message: 'Saved to Draft',
          placement : 'topRight',
        });
        break;
      case 'Discard':
        api.warning({
          message: 'Discarded',
          placement : 'topRight',
        });
        break;
      case 'Confirm':
        api.success({
          message: 'New Job Created',
          placement : 'topRight',
        });
        break;
    
      default:
        break;
    }
  };

  const positionCreationStatus = ( action : string) => {
    setCreatePosition(false);
    switch (action) {
      case 'Draft':
        api.success({
          message: 'Saved to Draft',
          placement : 'topRight',
        });
        break;
      case 'Discard':
        api.warning({
          message: 'Discarded',
          placement : 'topRight',
        });
        break;
      case 'Confirm':
        api.success({
          message: 'New Position Created',
          placement : 'topRight',
        });
        break;
    
      default:
        break;
    }
  };

  const closeCreateJob = () => {
    setCreateJob(false);
  }

  const resetFocusJob = () => {
    setFocusJob(null);
  }

  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 20,
            showSizeChanger: true,
            // hideOnSinglePage: true,
        },
    });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns: ColumnsType<DataType> = [
    {
        title: 'Position',
        dataIndex: 'Position',
        filters: [
            { text: 'CEO',    value: 'CEO' },
            { text: 'Intern', value: 'Intern' },
        ],
    //   filteredValue: filteredInfo.name || null,
        onFilter: (value: any, record) => record.Position.includes(value),
        sorter: (a, b) => a.Position.length - b.Position.length,
    //   sortOrder: sortedInfo.columnKey === 'Position' ? sortedInfo.order : null,
        // ellipsis: true,
        width: '20%',

    },
    {
        title: 'Salary',
        dataIndex: 'Salary',
        width: '20%',
    },
    {
        title: 'Opening',
        dataIndex: 'Opening',
        width: '20%',
    },
    {
        title: 'Applicants',
        dataIndex: 'Applicants',
        width: '20%',
    },
    {
        title: 'Application Deadline',
        dataIndex: 'Deadline',
        width: '20%',
    },
  ];

  useEffect(() => {
    setLoading(false);  
  }, [])
  

  const handleTableChange = (pagination : {}, filters : any, sorter : any) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    
    return (
      <>
        {contextHolder}
        <div className={hr.content}>
        <TopBar notification={`Application Deadline for the post "Senior Software Engineer" is over`}/>
          <div className={hr.TableContainer}>
            <Table
                scroll={{y: `${hr.tableHeight}` }}
                columns = {columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={(record, index) => ` shadowOnHover`}
                onRow={(record, rowIndex) => {
                  return {
                    onClick : event => //alert(`opening resume of participent with id : ${record.id}`),
                    setFocusJob(`${record.id}`)
                  };
                }}
            />
            <div className={hr.TableActionButtons}>
                <Button onClick={() => setCreateJob(true)}> + Add New Job</Button>
                <div className={hr.gap}/>
                <Button onClick={() => setCreatePosition(true)}> + Add New position</Button>
            </div>
          </div>
        </div>
          <div className={focusJob?hr.show : hr.hide}>
            <JobCard resetFocusJob = {resetFocusJob}/>
          </div>
          <div className={createJob?hr.show : hr.hide}>
            <AddJob jobCreationStatus = {jobCreationStatus}/>
          </div>
          <div className={createPosition?hr.show : hr.hide}>
            <AddPosition positionCreationStatus = {positionCreationStatus}/>
          </div>

      </>
    )
};

export default JobPosts;