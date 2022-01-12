import React from 'react'
import {Row, Col, Divider} from "antd";
class BillCard extends React.Component {
    render () {
        return (
            <div>
                <div className='balance'>
                    <div className='key'>结余</div>
                    <div className='value'>{this.props.balance.toFixed(2)}</div>
                </div>
                <Row className="income-expense">
                    <Col span={3}></Col>
                    <Col span={2} className='key'>收入</Col>
                    <Col span={5} className='value'>{this.props.income.toFixed(2)}</Col>
                    <Col span={2}><Divider type="vertical" /></Col>
                    <Col span={1}></Col>
                    <Col span={2} className='key'>支出</Col>
                    <Col span={8} className='value'>{this.props.expense.toFixed(2)}</Col>
                    
                </Row>
            </div>
        )
    }
}

export default BillCard;