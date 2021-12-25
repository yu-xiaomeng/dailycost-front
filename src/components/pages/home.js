import React from "react";
import {Button} from "antd";
import cookie from "react-cookies";

class Home extends React.Component {
    render () {
        let button;
        let isLoggedIn = cookie.load('token');
        if ( isLoggedIn ) {
            button = (
                <Button type="primary" href="./billList" className="login-form-button" style={{ width: '100px' }}>
                    记一笔
                </Button>
            )
        } else {
            button = (
                <Button type="primary" href="./login" className="login-form-button" style={{ width: '100px' }}>
                    登录
                </Button>
            )
        }
        return (
            <div className="home">
                <div className="home-opacity">
                    <div className="home-welcome">
                        <span> welcome </span>
                        <div className="home-logo">
                            DAILY COST 
                        </div>
                        { button }
                        
                        
                    </div>
                    
                </div>
            </div>
        )    
    }
}

export default Home;