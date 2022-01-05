import axios from 'axios';
import React from 'react'
import cookie from 'react-cookies';
import BottomBar from "../tabs/bottomBar";

import {Image} from 'antd-mobile';


class Me extends React.Component {
    state = {
        token: cookie.load("token"),
        userInfo: {},

    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        axios.get('/api/user', {
            headers: {"Authorization": 'Bearer '+this.state.token}
        }).then(res => {
            console.log(res.data.data);
            this.setState({userInfo: res.data.data});
        })
    }
    render () {
        return (
            <div className="aaa">
                <div className="pagecontent">
                    <div>
                        {/* {this.state.userInfo.avatar} */}
                        <Image
                            src={this.state.userInfo.avatar}
                            width={64}
                            height={64}
                            fit='cover'
                            style={{ borderRadius: 32 }}
                        />
                        yuxiaomeng
                    </div>
                </div>
                <div className="tab-bar">
                <BottomBar />
                </div>
            </div>
        )
        }
    
}

export default Me;

