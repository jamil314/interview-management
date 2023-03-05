// import React, { useEffect, useState, useRef, ReactNode }  from 'react'
// import { SearchOutlined } from '@ant-design/icons';
// import { Button, Input, Space, Table, theme } from 'antd';
// import type { ColumnsType, ColumnType } from 'antd/es/table';
// import type { FilterConfirmProps } from 'antd/es/table/interface';
// import '../CSS/hr.css'
// import Highlighter from 'react-highlight-words';

// interface TableProps {
//     Data : {}[],
//     onRowClick : (rowIndex : number) => {},
//     Columns : {}[],
//     floatButtons : ReactNode
// }

// const RenderTable : React.FC <TableProps> = ( {Data, onRowClick, Columns, floatButtons}) => {
    
//   const [Column, setColumn] = useState([]) ;
//     const [filteredInfo, setFilteredInfo] = useState(null);
//     const [sortedInfo, setSortedInfo] = useState(null); 

//     const clearFilters = () => {
//         setFilteredInfo(null);
//     };


//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef(null);

//     const handleSearch = (
//       selectedKeys: any[],
//       confirm: (param?: FilterConfirmProps) => void,
//       dataIndex: any,
//     ) => {
//       confirm();
//       setSearchText(selectedKeys[0]);
//       setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters : any) => {
//       clearFilters();
//       setSearchText('');
//     };

//     // interface DataType {
//     //   key: string;
//     //   name: string;
//     //   age: number;
//     //   address: string;
//     // }

//     // interface DataType = typeof Data;

//     // type DataIndex = keyof DataType;


    

//     const getColumnSearchProps = (dataIndex : any) : ColumnType<any> => ({

//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//             <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()} >
              
//               <Input
//                 ref={searchInput}
//                 placeholder={`Search ${dataIndex}`}
//                 value={selectedKeys[0]}
//                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                 style={{ marginBottom: 8, display: 'block' }}
//               />
              
//               <Space>
              
//               <Button
//                 type="primary"
//                 onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                 icon={<SearchOutlined />}
//                 size="small"
//                 style={{ width: 90}}
//               > Search </Button>
              
//               <Button
//                 onClick={() => clearFilters && handleReset(clearFilters)}
//                 size="small"
//                 style={{ width: 90 }}
//               > Reset </Button>
              
//               <Button
//                 type="link"
//                 size="small"
//                 onClick={() => {
//                   confirm({ closeDropdown: false });
//                   setSearchText( (selectedKeys as string[])[0]);
//                   setSearchedColumn(dataIndex);
//                 }}
//               > Filter </Button>
              
//               <Button
//                 type="link"
//                 size="small"
//                 onClick={() => {
//                   close();
//                 }}
//               > close </Button>
            
//             </Space>
          
//           </div>
//         ),

//         filterIcon: (filtered : any) => (
//           <SearchOutlined 
//             style={{ color: filtered ? '#1890ff' : undefined }}
//           />
//         ),

//         onFilter: (value : any, record : any) =>
//           record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        
//         // onFilterDropdownOpenChange: (visible : any) => {
//         //   if (visible) {
//         //     setTimeout(() => searchInput.current?.select(), 100);
//         //   }
//         // },

//         render: (text : any) =>
//         searchedColumn === dataIndex ? (
//             <Highlighter
//               highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//               searchWords={[searchText]}
//               autoEscape
//               textToHighlight={text ? text.toString() : ''}
//             />
//           ) : ( text ),
//     });
                
                
                
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState({
//         pagination: {
//             current: 1,
//             pageSize: 10,
//             showSizeChanger: true,
//             // hideOnSinglePage: true,
//         },
//     });
                
//     const fetchData = () => {
      
//       let tColumn: any[] | ((prevState: never[]) => never[]) = [];
//       console.log(Columns, Data);
//       Columns.map((data : any) => {
//         let dat = data;
//         // console.log(dat);
//         // console.log(data);
//         if( data.search ) 
//           dat = {...dat, ...getColumnSearchProps(data.title)};
//         if(data.filter){
//           dat.filteredValue = filteredInfo[data.dataIndex] || null;
//           dat.onFilter = (value, record) => record[data.dataIndex].includes(value)
//         }
//         tColumn.push(dat);
//       })
//       // console.log(tColumn);
//       setColumn(tColumn);
//     };
    

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [JSON.stringify(tableParams)]);

//     const handleTableChange = (pagination : any, filters : any, sorter : any) => {
//         setTableParams({
//             pagination,
//             filters,
//             ...sorter,
//         });
//         // console.log(filters);
//         setFilteredInfo(filters);
//         setSortedInfo(sorter);

//         // `dataSource` is useless since `pageSize` changed
//         // if (pagination.pageSize !== tableParams.pagination?.pageSize/manage) {
//         //   setData([]);
//         // }
//     };
  

//     return (
//       <div style={{position : 'relative'}}>
//         <div style = {{position : "absolute", left : "6px", bottom : "16px", zIndex : 1}}>
//           {floatButtons}
//         </div> 
//         <Table
//             scroll={{y: "calc(80vh - 129px)" }}
//             columns = {Column}
//             rowKey={(record : any) => record.id}
//             dataSource={Data}
//             pagination={tableParams.pagination}
//             loading={loading}
//             onChange={handleTableChange}
//             style = {{borderRight : '10px', borderTop : '10px', borderStyle : 'solid', borderColor : 'var(--AntBlue)'}}
//             rowClassName={(record : any, index) => `application-status-${record.Status} shadowOnHover`}
//             onRow={(record, rowIndex : any) => {
//               return {
//                 onClick : event => {onRowClick(rowIndex)},
//               };
//             }}
//         />
//       </div>
//     )
// }

// export default RenderTable


// ///https://github.com/typescript-cheatsheets/react/blob/main/README.md#function-components