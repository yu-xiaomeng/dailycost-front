import React from "react";
import { TabBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    BillOutline,
    FileOutline,
    AddCircleOutline,
    HistogramOutline,
    UserOutline,
  } from 'antd-mobile-icons'

function BottomBar () {
    const navigate = useNavigate();
    const location = useLocation();
    const {URIName} = location;
    const tabs = [
        {
            key: '/billList',
            title: '明细',
            icon: <BillOutline />,
        },
        {
            key: '/bill/yearly',
            title: '账单',
            icon: <FileOutline />,
        },
        {
            key: '/bill/new',
            title: '记一笔',
            icon: <AddCircleOutline />,
        },
        {
            key: '/report',
            title: '图表',
            icon: <HistogramOutline />,
        },
        {
            key: '/me',
            title: '我的',
            icon: <UserOutline />,
        },
    ]

    const handleChange =  (event) => {
        console.log(event);
        navigate(event); 
    }
      
    
    return (
        <TabBar activeKey={URIName} onChange={handleChange}>
            {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
    
          
}

export default BottomBar;