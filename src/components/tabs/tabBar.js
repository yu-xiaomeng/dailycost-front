import React from "react";
import {Tabs} from "antd";
import { Route } from "react-router";
import Login from "./login";

const { TabPane } = Tabs;

class TabBar extends React.Component {
    state = {
        tabPosition: 'bottom',
    };

    render () {
        const { tabPosition } = this.state;
        return (
            <div className="tab-bar">
                <Tabs tabPosition={tabPosition}> 
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab 3
                    </TabPane>
                </Tabs>   
            </div>
        )
    }
}

export default TabBar;