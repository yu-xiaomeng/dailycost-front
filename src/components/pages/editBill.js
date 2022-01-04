import React from "react";
import axios from "axios";
import cookie from "react-cookies";

import {
    Form,
    Input,
    Button,
    Dialog,
    DatePicker,
    Selector,
    Space,
    Radio,
  } from 'antd-mobile';
import dayjs from 'dayjs';

class EditBill extends React.Component {
    state = {
        pickerVisible: false,
        token: cookie.load("token"),
        category: {},
        categoryValue: "",
    }
    componentDidMount() {
        this.getCategoryByType();
    }

    onFinish = (values) => {
        // values.type = values.type[0];
        // values.date = dayjs(values.date).format('YYYY-MM-DD')
        // console.log(JSON.stringify(values));

        this.createNewBill(values);
    }

    getCategoryByType() {
        axios.get('/api/category', {
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log(res.data.data)
            this.setState({category: res.data.data});
        })
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
        })
    }

    render () {
        let category = this.state.category;
        let categoryName;
        if (category.length > 0) {
            categoryName = (
                <Radio.Group
                    value={this.state.categoryValue}
                    onChange={(val) => {
                        this.setState({categoryValue: val})
                    }}
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
        return (
            <div>
                <Form
                    onFinish={this.onFinish}
                    footer={
                        <Button block type='submit' color='primary'>
                        提交
                        </Button>
                    }
                    >
                    <Form.Item 
                        name='type' 
                        label='类型'
                        rules={[{ required: true, message: '请选择类型' }]}
                        initialValue={['EXPENSE']}
                    >
                        <Selector
                            columns={2}
                            options={[
                                { label: '支出', value: 'EXPENSE' },
                                { label: '收入', value: 'INCOME' },
                            ]}
                            onChange={(arr) => console.log(arr)}  
                        />
                    </Form.Item>
                    <Form.Item
                        name='categoryId' 
                        label='类别'
                        rules={[{ required: true, message: '请选择类别' }]}
                        >
                        {categoryName}
                    </Form.Item>
                    <Form.Item
                        name='date'
                        label='日期'
                        trigger='onConfirm'
                        rules={[{ required: true, message: '日期不能为空' }]}
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
                                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
                            }
                        </DatePicker>
                    </Form.Item>
                    <Form.Item
                        name='amount'
                        label='金额'
                        rules={[{ required: true, message: '金额不能为空' }]}
                    >
                        <Input placeholder='请输入金额'/>
                    </Form.Item>
                    <Form.Item name='note' label='备注'>
                        <Input placeholder='请输入备注' />
                    </Form.Item>
                    
                </Form>
            </div>
        )
    }
}

export default EditBill;
