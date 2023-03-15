import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { InputRef, Tooltip, notification } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, ColumnsType, FilterValue, SorterResult  } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import data from "../../../../Dummy/DummyInterviewers.js";

import hr from '../hr.module.scss'
import TopBar from '../../TopBar';
import InterviewrCard from './InterviewerCard';
import AddInterviewer from './AddInterviewer';

interface DataType {
    id: string;
    Name: string;
    Email: string;
    Phone: string;
    Position: string;
    Schedule: string;
}

type DataIndex = keyof DataType;


const Interviewers: React.FC = () => {

  const [focusInterviewer, setFocusInterviewer] = useState<null | string>(null);
  const [createInterviewer, setCreateInterviewer] = useState(false);


  const [api, contextHolder] = notification.useNotification();

  const interviewerCreationStatus = ( action : string) => {
    closeCreateInterviewer();
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
          message: 'New Interviewer Added',
          placement : 'topRight',
        });
        break;
    
      default:
        break;
    }
  };

  const closeCreateInterviewer = () => {
    setCreateInterviewer(false);
  }

  const resetFocusInterviewer = () => {
    setFocusInterviewer(null);
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
      title: 'Name',
        dataIndex: 'Name',
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        width: '20%',
    },
    {
        title: 'Phone',
        dataIndex: 'Phone',
        width: '20%',
    },
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
        title: 'Schedule',
        dataIndex: 'Schedule',
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
        <TopBar notification={`"Rahu Shinjo" is unavailable from 10 - 13 April`}/>
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
                    setFocusInterviewer(`${record.id}`)
                  };
                }}
            />
            <div className={hr.TableActionButtons}>
                <Button onClick={() => setCreateInterviewer(true)}> + Add New Interviewer</Button>
            </div>
          </div>
        </div>
          <div className={focusInterviewer?hr.show : hr.hide}>
            <InterviewrCard resetFocusInterviewer = {resetFocusInterviewer}/>
          </div>
          <div className={createInterviewer?hr.show : hr.hide}>
            <AddInterviewer interviewerCreationStatus = {interviewerCreationStatus}/>
          </div>

      </>
    )
};

export default Interviewers;