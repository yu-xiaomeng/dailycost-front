import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Avatar, Image } from 'antd';
import { NavBar, Button,  Modal, Toast, List, Space} from 'antd-mobile';
import { Navigate } from "react-router-dom";

class BillDetail extends React.Component {
    state = {
        token: cookie.load("token"),
        id: "",
        bill: {},
        categoryName: "",
        categoryIconUrl: "",
        deleted: false,
    }

    getBillDetailById(id) {
        axios.get('/api/bill/'+id,{
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            this.setState({bill: res.data.data.bill, categoryName: res.data.data.categoryName, categoryIconUrl: res.data.data.categoryIconUrl});
        })
    }

    deleteBillById(id) {
        axios.delete('/api/bill/'+id,{
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            if(res.status === 200){
                this.setState({deleted: true});
                console.log(this.state.deleted);
            }
            
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
        if (this.state.deleted === true) {
            return (<Navigate to="/billList" />)
        }
        return (
            <div>
                <NavBar onBack={this.back}>
                    详情</NavBar>
                <div className="detail-category">
                <Avatar src={<Image src={this.state.categoryIconUrl} style={{ backgroundColor: '#ffffff', width: 32 }} />} />

                    <br/>
                    {this.state.categoryName}
                </div>
                <List mode='card'>
                    <List.Item title='类型'>{this.state.bill.type}</List.Item>
                    <List.Item title='金额'>{this.state.bill.amount}</List.Item>
                    <List.Item title='日期'>{this.state.bill.date}</List.Item>
                    <List.Item title='备注'>{this.state.bill.note}</List.Item>
                </List>
                <div className="detail-operation">
                <Space style={{ '--gap': '50px' }}>
                <Button
                    color='default'
                    fill='solid'
                    onClick={() =>
                        Toast.show({
                          content: '功能还在开发中～',
                        })
                      }
               
                >编辑</Button>
                <Button
                    color='default'
                    fill='outline'
                    onClick={() =>
                    Modal.confirm({
                        title: "确认删除？",
                        content: '删除后数据不可恢复',
                        // confirmText: "删除",
                        onConfirm: async () => {
                            this.deleteBillById(this.state.id);
                        // await sleep(3000)
                        Toast.show({
                            icon: 'success',
                            content: '删除成功',
                            position: 'center',
                        })
                        },
                    })
                    }
                >
                    删除
                </Button>
                </Space>
                </div>
            </div>
        )
    }
}


export default BillDetail;