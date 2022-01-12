import React from 'react'
import cookie from "react-cookies";
import axios from "axios";
import {Row, Col} from "antd";
import {
    HomeOutlined,
    CaretDownOutlined,
  } from '@ant-design/icons';
import {DatePicker, Divider,Button, NavBar} from "antd-mobile";
import BillCard from '../cards/billCard';
import MonthBillList from '../lists/monthBillList';


class YearlyBill extends React.Component {
    state = {
        token: cookie.load('token'),
        year: new Date().getFullYear(),
        yearlyData: [],
        pickerVisible: false,
        totalExpense: 0,
        totalIncome: 0,
        totalBalance: 0,
    }
    componentDidMount() {
        this.getYearlyBill();
    }

    getYearlyBill() {
        axios.get('/api/bill/stat/yearly',{
            params: {
                year: this.state.year
              },
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log(res.data.data);
            let expense = 0;
            let income = 0;
            let balance = 0;
            for (let item of res.data.data) {
                expense = expense + item.expense;
                income = income + item.income;
                balance = balance + item.balance;
            }
            // console.log(expense, income);
            this.setState({yearlyData: res.data.data, totalExpense: expense, totalIncome: income, totalBalance: balance});
        })
    }

    refreshList(val) {
        const year = val.getFullYear();
        setTimeout(()=>{
            this.setState({year: year})
            this.getYearlyBill();
        })  
    }

    back = () => {
        document.location.replace("/billList")
    }

    right() {
        return (
            <div>
                <Button
                    fill='none'
                    onClick={() => {
                        this.setState({pickerVisible: true});
                    }}
                >
                    {this.state.year}年
                    <CaretDownOutlined />
                </Button>
        </div>
        )
    }

    render () {
        let yearlyData = this.state.yearlyData;
        let monthBillList;
        if (yearlyData.length > 0) {
            monthBillList = (
                <div>
                    {   
                        yearlyData.map((item, index) =>{
                            return  <MonthBillList key={index} data={item}/>
                        })
                    }
                </div>
            );
        }
        return (
            <div className="yearly">
                <NavBar 
                onBack={this.back} 
                backArrow={<HomeOutlined />}
                right={this.right()}>
                    账单</NavBar>
                <div className='header'>
                <DatePicker
                    visible={this.state.pickerVisible}
                    onClose={() => {
                        console.log("close");
                        this.setState({pickerVisible: false});
                    }}
                    precision='year'
                    onConfirm={val => {
                        // Toast.show(val.toString());
                        this.refreshList(val);
                    }}
                    />
                    
                    <div className='total'>
                            {console.log(this.state.year,this.state.totalExpense)}
                            <BillCard 
                            date={this.state.year}
                            income={this.state.totalIncome}
                            expense={this.state.totalExpense}
                            balance={this.state.totalBalance}
                            />
                    </div>
                </div>
                <div className="bill-list">
                    <div className='list-header'>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={4}>月份</Col>
                            <Col span={6}>收入</Col>
                            <Col span={6}>支出</Col>
                            <Col span={6}>结余</Col>
                        </Row>
                        <Divider />
                    </div>

                    {
                        monthBillList
                    }
                </div>
            </div>
        )
        }
    
}

export default YearlyBill;

