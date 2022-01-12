import React from "react";

import { List, Avatar,  Row, Col } from "antd";
import Amount from "./amount"

class DayBillList extends React.Component {
    state = {
        billList: this.props.data,
    }

    getDetailRoute(id) {
        return '/bill/'+id;
    }
    
    render() {
        return (
            <div className="day">
                <div className="day-total">
                    <Row>
                        <Col span={12}>{this.state.billList.date}</Col>
                        <Col span={6}>收入: {this.state.billList.income}</Col>
                        <Col span={6}>支出: {this.state.billList.expense} </Col>
                    </Row>
                </div>
                <div className="day-each">
                    <List
                        className="day-bill-list"
                        itemLayout="horizontal"
                        dataSource=
                        {this.state.billList.bill}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.categoryIconUrl} />}
                                title={<a href={this.getDetailRoute(item.bill.id)}>{item.categoryName}</a>}
                                // title={<a href="/bill/596d6ded-db59-4720-a41b-b0ce3019ac8e">{item.createdBy}</a>}
                                description={item.bill.note || "--" }
                                
                            />
                            <Amount type={item.bill.type} amount={item.bill.amount}/>
                        </List.Item>
                        )}
                    />
                </div>
            </div> 
        )
    }
}

export default DayBillList;