import React, { useState } from 'react';
import {
    AuditOutlined,
    ContainerOutlined,
    SoundOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    PoweroffOutlined,
    BuildOutlined,
} from '@ant-design/icons';
import { MenuProps, Tooltip } from 'antd';
import { Button, Menu } from 'antd';
import menu from "./Menu.module.scss";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    danger?: boolean,
    // style
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        danger,
        // style,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', 0, <BuildOutlined />),
    getItem('Applications', 1, <ContainerOutlined />),
    getItem('Shortlisted', 2, <AuditOutlined />),
    getItem('Job Postings', 3, <SoundOutlined />),
    getItem('Interviewers', 4, <TeamOutlined />),
    getItem('Log out', 'logOut', <PoweroffOutlined />, true),
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ]),
];

interface props {
  changeContent: (contentId : number) => void;
}


const MenuComponent : React.FC<props> = ({changeContent}) => {
    const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <>
    <div className={menu.container}>

      <div className={menu.header}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          className={menu.toggle}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div className={menu.title}>
          <Tooltip title = 'Interview Management System' placement='right'>
            <div className={menu.logo}/>
          </Tooltip>
          <div style={{display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
            <h1>IMS</h1>
          </div>
        </div>
      </div>
      <Menu
        onClick={(e) => {
          const {key} = e;
          if(key == 'logOut') window.location.href = '/';
          else changeContent(Number(key));
        }}
        className={menu.menu}
        id='hr-menu'
        defaultSelectedKeys={['0']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
    {/* <div className={menu.overlay} style={{left : collapsed? 70 : 162 + 'px', transition : "300ms ease"}}/> */}
    </>
  )
}

export default MenuComponent