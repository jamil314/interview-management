import React from 'react'
import { SearchOutlined, DownloadOutlined, CloudDownloadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, notification, Space, InputRef, Input, Table } from 'antd';

import hr from '../hr/hr.module.scss'


type Props = {
    notification : String;
}

const TopBar : React.FC<Props> = ({notification}) => {
  return (
    <div className={hr.topBar}>
        <div> <Tooltip title="Search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip> </div>
        <div style={{whiteSpace : 'nowrap'}}> {notification}</div>
        <div style={{width : '100%'}} />
        <div> <Tooltip title="Profile">
            <Button type="primary" shape="circle" icon={<UserOutlined />} />
        </Tooltip> </div>
    </div>
  )
}

export default TopBar