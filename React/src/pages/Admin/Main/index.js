import React, {Component} from 'react';
import {withRouter, Switch, Route, Redirect} from "react-router-dom";
import {deleteUserInfo} from "../../../util";
import {Button, Card, Modal} from "antd";
import {ExclamationCircleOutlined, LogoutOutlined} from '@ant-design/icons';
import Home from "../Home";
import Master from "../Master"
import Song from "../Music/song"
import Singer from "../Music/singer"
import Album from "../Album"
import Vocal from "../Vocal"
import ArticleList from "../ArticalList"
import User from "../User"
import Message from "../Message"
import Img from "../Folder/img"
import Video from "../Folder/video"

const titleMap = {
    "/admin/home": "首页",
    "/admin/user": "用户",
    "/admin/master": "后台人员",
    "/admin/music/song": "歌曲",
    "/admin/music/singer": "歌手",
    "/admin/vocal": "演唱会",
    "/admin/articleList": "文章",
    "/admin/album": "专辑",
    "/admin/messages": "评论",
    "/admin/folder/img": "图片",
    "/admin/folder/video": "音乐"
}

class Main extends Component {

    logout = () => {
        let {history} = this.props;
        Modal.confirm({
            title: '退出登录',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteUserInfo();
                history.replace("/login");
            }
        });
    }

    render() {
        let {pathname} = this.props.location;
        return (
            <div className="site-layout-background">
                <Card title={titleMap[pathname]} extra={<Button
                    icon={<LogoutOutlined />}
                    onClick={this.logout}>退出登录</Button>} >
                    <Switch>
                        <Route path="/admin/home" component={Home}/>
                        <Route path="/admin/user" component={User}/>
                        <Route path='/admin/master' component={Master}/>
                        <Route path='/admin/music/song' component={Song}/>
                        <Route path='/admin/music/singer' component={Singer}/>
                        <Route path='/admin/vocal' component={Vocal}/>
                        <Route path='/admin/articleList' component={ArticleList}/>
                        <Route path='/admin/album' component={Album}/>
                        <Route path='/admin/messages' component={Message}/>
                        <Route path='/admin/folder/img' component={Img}/>
                        <Route path='/admin/folder/video' component={Video}/>
                        <Redirect to="/admin/home"/>
                    </Switch>
                </Card>
            </div>
        );
    }
}

export default withRouter(Main);
