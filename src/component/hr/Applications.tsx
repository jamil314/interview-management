import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, DownloadOutlined, CloudDownloadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, notification, Space, InputRef, Input, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, ColumnsType, FilterValue, SorterResult  } from 'antd/es/table/interface';

import Highlighter from 'react-highlight-words';
import data from "../../../Dummy/DummyApplications.js";

import hr from '../hr/hr.module.scss'

import Resume from '@/component/hr/Resume';
import TopBar from './TopBar';



interface DataType {
    id: number;
    Name: string;
    Email: string;
    Phone: string;
    Position: string;
    Resume: string;
    Status: string;
    applicationDate: string;
}

type DataIndex = keyof DataType;


const Applications: React.FC = () => {

  const [resumeId, setResumeId] = useState<null | string>(null);
  const openResume = (id : string) => {
    setResumeId(id);
  }
  
  const closeResume = () => {
    setResumeId(null);
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

    const [api, contextHolder] = notification.useNotification();

    const initialScreening = ( action : string) => {
      closeResume();
      if(action == 'accept'){
        api.success({
          message: 'Added the CV to Shortlist',
          description: <Button> Undo </Button>,
          placement : 'topRight',
        });
      } else {
        api.error({
          message: 'Dropped the Cv',
          description: <Button> Undo </Button>,
          placement : 'topRight',
        });
      }
    };
    

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
      sorter: (a, b) => a.Name.length - b.Name.length,
      ... getColumnSearchProps('Name'),
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
        width: '15%',

    },
    {
        title: 'Date',
        dataIndex: 'applicationDate',
        width: '15%',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        width: '10%',
        render: (value) => <div style = {value ==  "Read" ? {opacity :  0.8} : {opacity :  1} }>{value ==  "Read" ? value   : value + " *" }</div>,
        filters: [
            { text: 'Read',   value: 'Read' },
            { text: 'Unread', value: 'Unread' },
        ],
        onFilter: (value: any, record) => record.Status.includes(value),
    },
    {
        title: 
            <Tooltip title = "Download All CV">
                <CloudDownloadOutlined onClick={e => alert('Downloading Cv of all participants in this page')}/>
            </Tooltip>,
        dataIndex: 'Resume',
        width: '10%',
        render: (record, index) => 
        <Tooltip title = "Download CV">
            <DownloadOutlined 
                onClick={ e => {
                        e.stopPropagation(); 
                        alert(`Downloading Cv of participant with id: ${index.id}`)}
                    }
                style={{padding : '2px 20px'}}
             />
        </Tooltip>,
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
            <TopBar notification="5 new Applications"/>
            <Table
                scroll={{y: `${hr.tableHeight}` }}
                columns = {columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={(record, index) => `tableCell${record.Status} shadowOnHover`}
                onRow={(record, rowIndex) => {
                  return {
                    onClick : event => //alert(`opening resume of participent with id : ${record.id}`),
                    openResume(`${record.id}`)
                  };
                }}
            />
          </div>
          {/* {
            resumeId != null ?
            :null
          } */}
          <div className={resumeId?hr.show : hr.hide}>
            <Resume closeResume={closeResume} resumeId={resumeId} initialScreening = {initialScreening}/>
          </div>
      </>
    )
};

export default Applications;