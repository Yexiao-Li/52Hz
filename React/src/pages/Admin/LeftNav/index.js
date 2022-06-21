import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Layout, Menu,} from 'antd';
import {
    HomeOutlined,
    FolderOutlined,
    OrderedListOutlined,
    DatabaseOutlined,
    TagsOutlined,
    DeploymentUnitOutlined,
    AppleOutlined,
    CommentOutlined,
    DesktopOutlined,
    UserOutlined
} from '@ant-design/icons';

const {Sider} = Layout;

const {SubMenu} = Menu;

class LeftNav extends Component {

    state = {
        collapsed: false,
    }

    change = (item) => {
        let {history} = this.props;
        let {key} = item;
        history.push(key);
    }


    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {collapsed} = this.state;
        let {pathname} = this.props.location;
        return (
            <Sider
                collapsible collapsed={collapsed} onCollapse={this.onCollapse}
                breakpoint="md"
                collapsedWidth="0"
            >
                <div className="logo">
                    <span><AppleOutlined/>52Hz的后台管理系统</span>
                </div>
                <Menu theme="dark"
                      defaultSelectedKeys={pathname}
                      onSelect={this.change}
                      mode="inline">
                    <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="/admin/user" icon={<UserOutlined />}>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="/admin/master" icon={<DesktopOutlined />}>
                        后台人员管理
                    </Menu.Item>
                    <SubMenu key="/admin/music" icon={<DatabaseOutlined />} title="音乐信息管理">
                        <Menu.Item key="/admin/music/singer">歌手信息</Menu.Item>
                        <Menu.Item key="/admin/music/song">歌曲信息</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/admin/vocal" icon={<DeploymentUnitOutlined/>}>
                        演唱会信息管理
                    </Menu.Item>
                    <Menu.Item key="/admin/articleList" icon={<OrderedListOutlined/>}>
                        文章列表
                    </Menu.Item>
                    <Menu.Item key="/admin/messages" icon={<CommentOutlined/>}>
                        评论管理
                    </Menu.Item>
                    <Menu.Item key="/admin/album" icon={<TagsOutlined/>}>
                        专辑管理
                    </Menu.Item>
                    <SubMenu key="/admin/folder" icon={<FolderOutlined />} title="文件管理">
                        <Menu.Item key="/admin/folder/img">图片管理</Menu.Item>
                        <Menu.Item key="/admin/folder/video">音乐管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(LeftNav);
