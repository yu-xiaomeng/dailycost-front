import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Descriptions } from 'antd';
import { NavBar, Button,  Modal, Toast} from 'antd-mobile'

class BillDetail extends React.Component {
    state = {
        token: cookie.load("token"),
        id: "",
        bill: {},
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

    back = () => {
        document.location.replace("/billList")
    }

    render () {
        return (
            <div>
                <NavBar onBack={this.back}>
                    详情</NavBar>
                <Descriptions
                    title="明细"
                    // size={state.size}
                    // extra={<Button type="primary">Edit</Button>}
                    >
                    <Descriptions.Item label="类别">{this.state.bill.categoryId}</Descriptions.Item>
                    <Descriptions.Item label="类型">{this.state.bill.type}</Descriptions.Item>
                    <Descriptions.Item label="金额">{this.state.bill.amount}</Descriptions.Item>
                    <Descriptions.Item label="日期">{this.state.bill.date}</Descriptions.Item>
                    <Descriptions.Item label="备注">{this.state.bill.note}</Descriptions.Item>
                    
                </Descriptions>
                <Button>编辑</Button>
                <Button
                    onClick={() =>
                    Modal.confirm({
                        title: "确认删除？",
                        content: '删除后数据不可恢复',
                        // confirmText: "删除",
                        onConfirm: async () => {
                            // await getBillDetailById();
                        // await sleep(3000)
                        Toast.show({
                            icon: 'success',
                            content: '提交成功',
                            position: 'bottom',
                        })
                        },
                    })
                    }
                >
                    删除
                </Button>
                
            </div>
        )
    }
}


export default BillDetail;