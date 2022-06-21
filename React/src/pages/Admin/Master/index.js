import React, {Component} from 'react';
import {reqAdmin, reqUpdateAdmin, reqDeleteAdmin, reqAddAdmin} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm,
    Tag
} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

class Master extends Component {

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
        let {status, data} = await reqAdmin(current);
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

    // 更新表单值
    initEditMaster = (data) => {
        let {id, name, password} = data;
        this.formRef.current.setFieldsValue({name,id,password});//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true});
    }

    deleteMaster = async (data) => {
        let {status, msg} = await reqDeleteAdmin(data.id);
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

    addMaster = () => {
        this.formValidate(reqAddAdmin);
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
            this.addMaster();
            return;
        }
        this.editMaster();
    }

    editMaster = () => {
        this.formValidate(value => {
            return reqUpdateAdmin(value);
        })
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
        this.resetForm();
    }

    columns = [
        {
            title: '姓名',
            dataIndex: 'Name',
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
                let {tagid, id} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{id}</Tag>
                ) : (<Tag color="orange">{id}</Tag>)
            }
        },
        {
            title: '密码',
            dataIndex: 'Password',
            //区别颜色
            render: (_, record) => {
                let {tagid, password} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{password}</Tag>
                ) : (<Tag color="orange">{password}</Tag>)
            }
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="small">
                        <Button size="small" icon={<EditOutlined/>} onClick={() => this.initEditMaster(data)}/>
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
                    onClick={() => this.setState({isModalVisible: true, isAdd: true})}>添加管理员</Button>}>
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
                        ref={this.formRef}//读取修改的值或空值
                        {...formItemLayout}
                    >
                        <Form.Item
                            name="id"
                        >
                            <span>请编辑</span>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
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
                            <Input placeholder="请输入姓名"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:'密码为必填项'
                                },
                                {
                                    min: 6,
                                    message: '密码需要大于6个字符',
                                },
                                {
                                    max: 10,
                                    message: '密码需要小于10个字符'
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input placeholder="请输入密码"/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Master;