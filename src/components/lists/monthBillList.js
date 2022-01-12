import React from "react";

import { Row, Col } from "antd";
import { Divider } from "antd-mobile";

class MonthBillList extends React.Component {
    render() {
        return (
            <div className="month-total-item">
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>{this.props.data.date.split('-')[1]}月</Col>
                    <Col span={6}>{this.props.data.income ? this.props.data.income.toFixed(2) : '0.00 '}</Col>
                    <Col span={6}>{this.props.data.expense? this.props.data.expense.toFixed(2) : '0.00 '} </Col>
                    <Col span={6}>{this.props.data.balance? this.props.data.balance.toFixed(2) : '0.00 '} </Col>
                </Row>
                <Divider />
            </div> 
        )
    }
}

export default MonthBillList;