import React, {Component} from 'react';
import {getUserInfo} from "../../util";
import {Layout, message} from 'antd';
import "./admin.css";
import Main from "./Main";
import LeftNav from './LeftNav';

const {Header, Content, Footer} = Layout;

class Admin extends Component {

    componentDidMount() {
        let {history} = this.props;
        let {isLogin} = getUserInfo();
        if (!isLogin) {
            message.warn("抱歉，你未登录，请先登录");
            history.replace("/login");
        }
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <LeftNav/>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Main/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>52Hz音乐社区小组</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;