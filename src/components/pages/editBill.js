import React from "react";
import axios from "axios";
import cookie from "react-cookies";

import {
    Form,
    Input,
    Button,
    DatePicker,
    Selector,
    Space,
    Radio,
    NavBar,
  } from 'antd-mobile';
import dayjs from 'dayjs';
import { Navigate } from "react-router-dom";

class EditBill extends React.Component {
    state = {
        pickerVisible: false,
        token: cookie.load("token"),
        category: [],
        categoryCur: [],
        type: "EXPENSE",
        createStatus: 0,
    }
    componentDidMount() {
        this.getCategory();
    }

    onFinish = (values) => {
        // console.log(values)
        this.createNewBill(values);
    }

    getCategory() {
        axios.get('/api/category', {
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log("category",res.data.data)
            let expense = [];
            let income = [];
            for ( let item of res.data.data) {
                console.log('item: ',item)
                if (item.type === "EXPENSE") {
                    expense.push(item);
                } else if(item.type === "INCOME") {
                    income.push(item);
                }
            }
            this.setState({category: res.data.data, categoryCur: expense})
        })
    }

    setCategoryByType(type) {
        let category = [];
        for ( let item of this.state.category) {
            console.log('item: ',item)
            if (item.type === type[0]) {
                category.push(item);
            } 
        }
        console.log(category);
        this.setState({categoryCur: []})
        this.setState({categoryCur: category});
    }

    createNewBill(values) {
        const data = {
            type: values.type[0],
            categoryId: values.categoryId,
            amount: Number(values.amount),
            date: dayjs(values.date).format('YYYY-MM-DD'),
            note: values.note,
        }
        console.log(data);
        axios.post('/api/bill', data, {
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log(res.data.data);
            if(res.status === 200) {
                this.setState({createStatus: 200});
            }
        })
    }

    back = () => {
        document.location.replace("/billList")
    }

    render () {
        let category = this.state.categoryCur;
        let categoryList;
        if (category.length > 0) {
            categoryList = (
                <Radio.Group
                    value="category"
                >
                <Space>
                {
                category.map((item, index) =>{
                    return  (<Radio value={item.id} key={index}>{item.name}</Radio>); 
                })
                }
                </Space>
                </Radio.Group> 
            )
        }
        if (this.state.createStatus === 200) {
            return (<Navigate to="/billList" />)
        }
        return (
            <div>
                <NavBar onBack={this.back}>
                    ?????????</NavBar>
                <Form
                    initialValues={{type:['EXPENSE']}}
                    onFinish={this.onFinish}
                    footer={
                        <Button block type='submit' color='primary'>
                        ??????
                        </Button>
                    }
                    >
                    <Form.Item 
                        name='type' 
                        label='??????'
                        rules={[{ required: true, message: '???????????????' }]}
                        
                    >
                        <Selector
                            columns={2}
                            options={[
                                { label: '??????', value: 'EXPENSE' },
                                { label: '??????', value: 'INCOME' },
                            ]}
                            onChange={(arr) => {
                                console.log(arr);
                                this.setState({type: arr});
                                this.setCategoryByType(arr);
                            }}  
                        />
                    </Form.Item>
                    <Form.Item
                        name='categoryId' 
                        label='??????'
                        rules={[{ required: true, message: '???????????????' }]}
                        >
                        {categoryList}
                    </Form.Item>
                    <Form.Item
                        name='date'
                        label='??????'
                        trigger='onConfirm'
                        rules={[{ required: true, message: '??????????????????' }]}
                        onClick={() => {
                            this.setState({pickerVisible: true})
                        }}
                        initialValue={new Date()}
                    >
                        <DatePicker
                            visible={this.state.pickerVisible}
                            onClose={() => {
                                this.setState({pickerVisible: false})
                            }}
                        >
                            {value =>
                                value ? dayjs(value).format('YYYY-MM-DD') : '???????????????'
                            }
                        </DatePicker>
                    </Form.Item>
                    <Form.Item
                        name='amount'
                        label='??????'
                        rules={[{ required: true, message: '??????????????????' }]}
                    >
                        <Input placeholder='???????????????'/>
                    </Form.Item>
                    <Form.Item name='note' label='??????'>
                        <Input placeholder='???????????????' />
                    </Form.Item>
                    
                </Form>
            </div>
        )
    }
}

export default EditBill;
