import React, {Component} from 'react';
import {reqAlbum, reqUpdateAlbum, reqDeleteAlbum, reqAddAlbum} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Image,
    Tag
} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

class Vocal extends Component {

    state = {
        dataSource: [],
        total: 0,
        isModalVisible: false,//是否更新
        isAdd: false,
        current: 1,
    }

    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqAlbum(current);
        if (status === 1) {
            message.error("网络异常");
            return;
        }
        let dataSource = data;
        for(let i = 0; i < dataSource.length; i++){
            dataSource[i].tagid = i
        }
        let total = data.length
        this.setState({dataSource, total})
    }
    // 分页
    pageChange = (pageInfo) => {
        let {current} = pageInfo;
        this.setState({current}, () => {
            this.initDataSource();
        });
    }

    // 更新表单值
    initEdit = (data) => {
        let {singer, name, song, img, id} = data;
        this.formRef.current.setFieldsValue({singer, name, song, img, id});//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true});
    }

    delete = async (data) => {
        let {status, msg} = await reqDeleteAlbum(data.id);
        console.log({status, msg})
        if (status === 200) {
            message.success(msg);
            this.initDataSource();
            return;
        }
        message.error(msg);
    }

    resetForm = () => {
        this.formRef.current.resetFields();
    }

    add = () => {
        this.formValidate(reqAddAlbum);
    }

    // 校验表单并提交数据
    formValidate = (func) => {
        this.formRef.current.validateFields().then(async value => {
            console.log(value)
            let {status, msg} = await func(value);
            if (status === 200) {
                this.initDataSource();
                message.success(msg);
                this.resetForm();
                this.setState({isModalVisible: false})
                return;
            }
            message.error(msg);
        }).catch(error => {
            let {errors} = error.errorFields[0];
            message.error(`${errors[0]}`)
            this.resetForm();
        });
    }

    handleOk = () => {
        let {isAdd} = this.state;
        if (isAdd) {
            this.add();
            return;
        }
        this.edit();
    }

    edit = () => {
        this.formValidate(value => {
            return reqUpdateAlbum(value);
        })
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
        this.resetForm();
    }

    columns = [
        {
            title: '歌手名',
            dataIndex: 'singer',
            //区别颜色
            render: (_, record) => {
                let {tagid, singer} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green" >{singer}</Tag>
                ) : (<Tag color="orange">{singer}</Tag>)
            }
        },
        {
            title: '专辑名',
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
            title: '包含歌曲',
            dataIndex: 'songs',
            //区别颜色
            render: (_, record) => {
                let {tagid, song} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{song}</Tag>
                ) : (<Tag color="orange">{song}</Tag>)
            }
        },
        {
            title: '海报',
            dataIndex: 'url',
            //区别颜色
            render: (_, record) => {
                let {img} = record;
                return (
                    <Image src={img} width='20px'/>
                )
            }
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="small">
                        <Button size="small" icon={<EditOutlined/>} onClick={() => this.initEdit(data)}/>
                        <Popconfirm
                            title="确定删除吗？"
                            onConfirm={() => this.delete(data)}
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
        let {dataSource, total, isModalVisible, isAdd} = this.state;
        const formItemLayout = {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 14,
            },
        };

        return (
            <div>
                <Card extra={<Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => this.setState({isModalVisible: true, isAdd: true})}>添加专辑信息</Button>}>
                    <Table
                        rowKey="id"
                        size="small"
                        onChange={this.pageChange}
                        pagination={{defaultPageSize: LIMIT, total, showTotal: (total) => `共 ${total} 条`}}
                        dataSource={dataSource}
                        columns={this.columns}/>
                </Card>
                <Modal title={isAdd ? "添加" : "编辑"}
                       forceRender={true}
                       okText="确定"
                       cancelText="取消"
                       visible={isModalVisible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <Form
                        name="basic"
                        {...formItemLayout}
                        ref={this.formRef}//读取修改的值或空值
                    >
                        <Form.Item
                            name="id"
                        >
                            <span>请编辑</span>
                        </Form.Item>
                        <Form.Item
                            label="Singer"
                            name="singer"
                            rules={[
                                {
                                    required: true,
                                    message: '名字为必填项',
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input placeholder="请输入歌手名"/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: '名字为必填项',
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input placeholder="请输入专辑名"/>
                        </Form.Item>
                        <Form.Item
                            label="Song"
                            name="song"
                            rules={[
                                {
                                    required: true,
                                    message: '歌曲为必填项',
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input placeholder="请输入歌曲"/>
                        </Form.Item>
                        <Form.Item
                            label="Url"
                            name="img"
                            rules={[
                                {
                                    required: true,
                                    message: '海报链接为必填项',
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input.TextArea placeholder="请输入海报链接"/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Vocal;