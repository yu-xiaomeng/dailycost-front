import React from "react";
import { Row, Col, DatePicker, Empty } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from "axios";
import cookie from "react-cookies";
import BottomBar from "../tabs/bottomBar";
import DayBillList from "../lists/dayBillList";

class BillList extends React.Component {
    state = {
        token: cookie.load('token'),
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        monthlyIncome: 0,
        monthlyExpense: 0,
        billList: [],
    };

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

    getMonthlyBillList() {
        axios.get('/api/bill/list',{
            params: {
              date: this.state.year+'-'+this.state.month
            },
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            this.setState({billList: []});
            this.setState({billList: res.data.data}); 
            
        })
    }

    componentDidMount() {
        this.getMonthlyBill();
        this.getMonthlyBillList();
    }

    handleChange = (value, dateString) => {
        setTimeout(() => { 
            this.setState({year: value.format("YYYY"), month: dateString});
            this.getMonthlyBill();
            this.getMonthlyBillList();
        });
    }

    render () {
        const monthFormat = 'MM';
        let billList = this.state.billList;
        let dayBillList = (<Empty />);
        
        if (billList.length > 0) {
            dayBillList = (
                <div id="scrollableDiv"
                        style={{
                        height: 500,
                        overflow: 'auto',
                        padding: '0 1px',
                        }}>
                        {
                            billList.map((item, index) =>{
                                return  <DayBillList key={index} data={item}/>
                            })
                        }
                    </div>
            );
        }
        
        return (
            <div className="bill-list">
                <div className="title">
                    DAILY COST
                </div>
                <div className="monthly">
                <Row className="monthly-field">
                    <Col span={2}></Col>
                    <Col span={6}>{this.state.year}</Col>
                    <Col span={7}>收入</Col>
                    <Col span={7}>支出</Col>
                </Row>
                <Row className="monthly-value">
                    <Col span={2}></Col>
                    <Col span={4}>
                    <DatePicker 
                        picker='month'
                        defaultValue={moment(this.state.month, monthFormat)}
                        format={monthFormat}
                        inputReadOnly={true}
                        bordered={false}
                        allowClear={false}
                        size="large"
                        suffixIcon={<CaretDownOutlined />}
                        onChange={this.handleChange}
                    ></DatePicker>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={7}>{this.state.monthlyIncome}</Col>
                    <Col span={7}>{this.state.monthlyExpense}</Col>
                </Row>
                    
                </div>
                <div className="monthly-bill-list">
                    {dayBillList}
                </div>
                <div className="tab-bar"> 
                    <BottomBar />
                </div>
            </div>
        )    
    }
}

export default BillList;