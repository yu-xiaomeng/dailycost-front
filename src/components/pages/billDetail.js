import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Descriptions, Button } from 'antd';

class BillDetail extends React.Component {
    state = {
        token: cookie.load("token"),
        id: 0,
        bill: {},
        size:  'default',
    }

    getBillDetailById(id) {
        axios.get('/api/bill/'+id,{
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            this.setState({bill: res.data.data});
        })
    }
    componentDidMount() {
        let pathname =  document.location.pathname.split('/');
        setTimeout(() => {
            if(pathname.length === 3) {
                this.setState({id: pathname[2]});
            }
            this.getBillDetailById(this.state.id);
        })
    }

    render () {
        return (
            <div>
                <Descriptions
                    title="明细"
                    size={this.state.size}
                    extra={<Button type="primary">Edit</Button>}
                    >
                    <Descriptions.Item label="类别">{this.state.bill.categoryId}</Descriptions.Item>
                    <Descriptions.Item label="类型">{this.state.bill.type}</Descriptions.Item>
                    <Descriptions.Item label="金额">{this.state.bill.amount}</Descriptions.Item>
                    <Descriptions.Item label="日期">{this.state.bill.date}</Descriptions.Item>
                    <Descriptions.Item label="备注">{this.state.bill.note}</Descriptions.Item>
                    
                </Descriptions>
                
            </div>
        )
    }
}

export default BillDetail;