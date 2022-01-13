import axios from 'axios';
import React from 'react'
import cookie from 'react-cookies';
import BottomBar from "../tabs/bottomBar";

import {Row, Col} from "antd";
import {Image, Space, Card, List, Toast} from 'antd-mobile';
import { SetOutline, InformationCircleOutline } from 'antd-mobile-icons'


class Me extends React.Component {
    state = {
        token: cookie.load("token"),
        userInfo: {},
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        monthlyIncome: 0,
        monthlyExpense: 0,
    }

    componentDidMount() {
        this.getUserInfo();
        this.getMonthlyBill();
    }

    getUserInfo() {
        axios.get('/api/user', {
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log(res.data.data);
            this.setState({userInfo: res.data.data});
        })
    }

    getMonthlyBill() {
        axios.get('/api/bill/stat/monthly',{
            params: {
              date: this.state.year+'-'+this.state.month
            },
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            const income = res.data.data.income ?? 0;
            const expense = res.data.data.expense ?? 0;
            this.setState({monthlyIncome: income, monthlyExpense: expense});
        })
    }

    gridStyle = {
        width: '25%',
        textAlign: 'center',
      };

    render () {
        return (
            <div className="aaa">
                <div className='user-info-card'>
                    <Space align='center'>
                    <Image className='avatar'
                        src={this.state.userInfo.avatar}
                        width={64}
                        height={64}
                        fit='cover'
                        style={{ borderRadius: 32 }}
                    />
                    <div className='username'>{this.state.userInfo.username}</div>
                    </Space>
                </div>
                <div className='monthly-bill-card'>
                    <Card title="本月账单">
                        <Row className='bill-key'>
                            <Col span={3}>{this.state.year}</Col>
                            <Col span={7}>收入</Col>
                            <Col span={7}>支出</Col>
                            <Col span={7}>结余</Col>
                        </Row>
                        <Row className='bill-value'>
                            <Col span={3}>{this.state.month}月</Col>
                            <Col span={7}>{this.state.monthlyIncome.toFixed(2)}</Col>
                            <Col span={7}>{this.state.monthlyExpense.toFixed(2)}</Col>
                            <Col span={7}>{(this.state.monthlyIncome - this.state.monthlyExpense).toFixed(2)}</Col>
                        </Row>
                    </Card>
                </div>
                <div className='operation-list'>
                    <List mode='card'>
                        
                        <List.Item prefix={<SetOutline />} onClick={() => { Toast.show({
                          content: '功能还在开发中～',
                        })}}>
                        类别设置
                        </List.Item>
                        <List.Item prefix={<InformationCircleOutline />} onClick={() => {}}>
                        关于
                        </List.Item>
                    </List>
                </div>
                <div className="tab-bar">
                <BottomBar />
                </div>
            </div>
        )
        }
    
}

export default Me;

