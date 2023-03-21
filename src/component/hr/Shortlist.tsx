import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, ColumnsType, FilterValue, SorterResult  } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import data from "../../../Dummy/DummyApplications.js";

import hr from '../hr/hr.module.scss'

import ApplicationStatus from './ApplicationStatus';
import TopBar from '../TopBar';




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


const Shortlist: React.FC = () => {

  const [focus, setFocus] = useState<null | string>(null);

  const resetFocus = () => {
    setFocus(null);
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
        <div className={hr.content}>
          <TopBar notification="5 new Shortlisted Applications"/>
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
                  setFocus(`${record.id}`)
                };
              }}
          />
        </div>
        {
          focus != null ?
            <ApplicationStatus resetFocus = {resetFocus}/>
          :null
        }
      </>
    )
};

export default Shortlist;