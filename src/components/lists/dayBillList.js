import React from "react";

import { List, Avatar, Space } from "antd";
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
                    <Space>
                    {this.state.billList.date}
                    收入: {this.state.billList.income}
                    支出: {this.state.billList.expense} 
                    </Space> 
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
                                avatar={<Avatar src="https://randomuser.me/api/portraits/men/15.jpg" />}
                                title={<a href={this.getDetailRoute(item.id)}>{item.createdBy}</a>}
                                // title={<a href="/bill/596d6ded-db59-4720-a41b-b0ce3019ac8e">{item.createdBy}</a>}
                                description={item.note}
                                
                            />
                            <Amount type={item.type} amount={item.amount}/>
                        </List.Item>
                        )}
                    />
                </div>
            </div> 
        )
    }
}

export default DayBillList;