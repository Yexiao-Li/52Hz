import React, {Component} from 'react';
import {reqList, reqUpdateList, reqDeleteList} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Radio,
    Tag
} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

class ArticalList extends Component {

    state = {
        dataSource: [],
        total: 0,
        isModalVisible: false,//是否更新
        current: 1,
    }

    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqList(current)
        if (status === 1) {
            message.error("网络异常");
            return;
        }
        let dataSource = data
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
        let {Text, Class, ID} = data;
        this.formRef.current.setFieldsValue({Text, Class, ID});//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true});
    }

    delete = async (data) => {
        let {status, msg} = await reqDeleteList(data.ID);
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
        this.edit();
    }

    edit = () => {
        this.formValidate(value => {
            return reqUpdateList(value);
        })
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
        this.resetForm();
    }

    columns = [
        {
            title: '内容',
            dataIndex: 'Text',
            //区别颜色
            render: (_, record) => {
                let {tagid, Text} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green" ><div title = {Text} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{Text}</div></Tag>
                ) : (<Tag color="orange"><div title = {Text} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{Text}</div></Tag>)
            }
        },
        {
            title: '发布时间',
            dataIndex: 'Time',
            //区别颜色
            render: (_, record) => {
                let {tagid, Time} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{Time}</Tag>
                ) : (<Tag color="orange">{Time}</Tag>)
            }
        },
        {
            title: '点赞数',
            dataIndex: 'LikeNum',
            //区别颜色
            render: (_, record) => {
                let {tagid, LikeNum} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{LikeNum}</Tag>
                ) : (<Tag color="orange">{LikeNum}</Tag>)
            }
        },
        {
            title: '发布圈',
            dataIndex: 'Class',
            //区别颜色
            render: (_, record) => {
                let {tagid, Class} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{Class}</Tag>
                ) : (<Tag color="orange">{Class}</Tag>)
            }
        },
        {
            title: '评论数',
            dataIndex: 'CommentNum',
            //区别颜色
            render: (_, record) => {
                let {tagid, CommentNum} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{CommentNum}</Tag>
                ) : (<Tag color="orange">{CommentNum}</Tag>)
            }
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            //区别颜色
            render: (_, record) => {
                let {tagid, userName} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{userName}</Tag>
                ) : (<Tag color="orange">{userName}</Tag>)
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
                <Card>
                    <Table
                        rowKey="id"
                        size="small"
                        onChange={this.pageChange}
                        pagination={{defaultPageSize: LIMIT, total, showTotal: (total) => `共 ${total} 条`}}
                        dataSource={dataSource}
                        columns={this.columns}/>
                </Card>
                <Modal title={"编辑"}
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
                            name="ID"
                        >
                            <span>请编辑</span>
                        </Form.Item>
                        <Form.Item
                            label="Text"
                            name="Text"
                            rules={[
                                {
                                    required: true,
                                    message: '内容为必填项',
                                },
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input.TextArea placeholder="请输入内容"/>
                        </Form.Item>
                        <Form.Item
                            name="Class"
                            label="Class"
                            rules={[
                              {
                                required: true,
                                message: '请选择类别',
                              },
                            ]}
                          >
                            <Radio.Group>
                              <Radio.Button value="流行">流行</Radio.Button>
                              <Radio.Button value="摇滚">摇滚</Radio.Button>
                              <Radio.Button value="说唱">说唱</Radio.Button>
                              <Radio.Button value="民谣">民谣</Radio.Button>
                              <Radio.Button value="其他">其他</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ArticalList;