import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { SearchOutlined } from '@ant-design/icons';
import { InputRef, Tooltip, notification } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, ColumnsType, FilterValue, SorterResult  } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
// import data from "../../../../Dummy/DummyJobs.js";

import hr from '../hr.module.scss'

import JobCard from './JobCard';
import AddJob from './AddJob';
import TopBar from '../../TopBar';
import AddPosition from './AddPosition';

interface DataType {
    id: string;
    position: string;
    maxSalary: Number;
    minSalary: Number;
    vacancy: string;
    numOfApplicants: Number;
    deadline: string;
	createdAt? : string;
	isAvailable? : boolean;
}

type DataIndex = keyof DataType;


const JobPosts: React.FC = () => {
  
  const [focusJob, setFocusJob] = useState<null | DataType>(null);
  const [createJob, setCreateJob] = useState(false);
  const [createPosition, setCreatePosition] = useState(false);
  
  const [tableData, setTableData] = useState([]);

  const [api, contextHolder] = notification.useNotification();

  const getTableData = () => {

    axios.get(`http://192.168.68.101:8080/jobsearch`,
		{
			headers: {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => {
			const t = res.data.data;
			console.log(t);
			setTableData(t);
			setLoading(false);
			
		}).catch(err => {
			if(err) {
				console.log(err);
				
			}
		})
	
    
  }

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
      record
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
        dataIndex: 'position',
        filters: [
            { text: 'CEO',    value: 'CEO' },
            { text: 'Intern', value: 'Intern' },
        ],
    //   filteredValue: filteredInfo.name || null,
        onFilter: (value: any, record) => record.position.includes(value),
        sorter: (a, b) => a.position.length - b.position.length,
    //   sortOrder: sortedInfo.columnKey === 'Position' ? sortedInfo.order : null,
        // ellipsis: true,

    },
    {
        title: 'Salary',
		render: (value, record) => <a>{`${record.minSalary} - ${record.maxSalary}`}</a>,
        width: '15%',
    },
    {
        title: 'Vacancy',
        dataIndex: 'vacancy',
        width: '10%',
    },
    {
        title: 'Applicants',
        dataIndex: 'numOfApplicants',
        width: '10%',
    },
    {
        title: 'Application Deadline',
        dataIndex: 'deadline',
        width: '20%',
    },
  ];

  useEffect(() => {
    getTableData();  
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
        <TopBar notification={`Application Deadline for the post "Senior Software Engineer" is over Application Deadline for the post "Senior Software Engineer" is over Application Deadline for the post "Senior Software Engineer" is over`}/>
          <div className={hr.TableContainer}>
            <Table
                scroll={{y: `${hr.tableHeight}` }}
                columns = {columns}
                rowKey={(record) => record.id}
                dataSource={tableData}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={(record, index) => ` shadowOnHover`}
                onRow={(record, rowIndex) => {
                  return {
                    onClick : event => //alert(`opening resume of participent with id : ${record.id}`),
                    {
                      setFocusJob(record);
                      console.log(record);
                    }
                    
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
            <JobCard record = {focusJob} resetFocusJob = {resetFocusJob}/>
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