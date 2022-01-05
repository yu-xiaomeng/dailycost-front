import axios from 'axios';
import React from 'react'
import cookie from 'react-cookies';
import BottomBar from "../tabs/bottomBar";


class Report extends React.Component {
    render () {
        return (
            <div className="aaa">
                <div className="pagecontent">
                    <div>
                        功能加紧开发中，敬请期待!
                    </div>
                </div>
                <div className="tab-bar">
                <BottomBar />
                </div>
            </div>
        )
        }
    
}

export default Report;