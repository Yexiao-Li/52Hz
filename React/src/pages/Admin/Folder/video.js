import React, {Component} from 'react';
import {reqVideo, reqDeleteVideo} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Upload, Image,
    Tag
} from "antd";
import { DeleteOutlined } from '@ant-design/icons';

class Video extends Component {

    state = {
        dataSource: [],
        total: 0,
    }

    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqVideo(current);
        if (status === 1) {
            message.error("网络异常");
            return
        }
        let dataSource = data
        for(let i = 0; i < dataSource.length; i++){
            dataSource[i].tagid = i
        }
        let total = data.length;
        this.setState({dataSource, total});
    }
    // 分页
    pageChange = (pageInfo) => {
        let {current} = pageInfo;
        this.setState({current}, () => {
            this.initDataSource();
        });
    }

    deleteMaster = async (data) => {
        console.log(data)
        let {status, msg} = await reqDeleteVideo(data.name, data.ID, data.type, data.singer);
        if (status === 200) {
            message.success(msg);
            this.initDataSource();
            return;
        }
        message.error(msg);
    }

    columns = [
        {
            title: '音乐',
            dataIndex: 'name',
            //区别颜色
            render: (_, record) => {
                let {tagid, name} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{name}</Tag>
                ) : (<Tag color="orange">{name}</Tag>)
            }
        },
        {
            title: 'ID',
            dataIndex: 'ID',
            //区别颜色
            render: (_, record) => {
                let {tagid, ID} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{ID}</Tag>
                ) : (<Tag color="orange">{ID}</Tag>)
            }
        },
        {
            title: '类型',
            dataIndex: 'type',
            //区别颜色
            render: (_, record) => {
                let {tagid, type} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{type}</Tag>
                ) : (<Tag color="orange">{type}</Tag>)
            }
        },
        {
            title: '歌手',
            dataIndex: 'singer',
            //区别颜色
            render: (_, record) => {
                let {tagid, singer} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{singer}</Tag>
                ) : (<Tag color="orange">{singer}</Tag>)
            }
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="small">
                        <Popconfirm
                            title="确定删除吗？"
                            onConfirm={() => this.deleteMaster(data)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button size="small" icon={<DeleteOutlined/>} danger/>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    render() {
        let {dataSource, total} = this.state;      
        return (
            <div>
                <Card>
                    <Table
                        rowKey="id"
                        size="small"
                        onChange={this.pageChange}
                        pagination={{defaultPageSize: LIMIT, total, showTotal: (total) => `共 ${total} 条`}}
                        dataSource={dataSource}
                        columns={this.columns}/>
                </Card>
            </div>
        );
    }
}

export default Video;