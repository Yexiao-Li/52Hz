import React, {Component} from 'react';
import {reqPic, reqUpdatePic, reqDeletePic, reqAddPic} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Upload, Image,
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
        fileList: []
    }

    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqPic(current);
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
        let {id, name, img} = data;
        this.formRef.current.setFieldsValue({id, name, img});//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true});
    }

    deleteMaster = async (data) => {
        let {status, msg} = await reqDeletePic(data.name, data.id);
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
        this.formValidate(reqAddPic);
        this.setState({fileList:[]})
    }

    // 校验表单并提交数据
    formValidate = (func) => {
        this.formRef.current.validateFields().then(async value => {
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
            return reqUpdatePic(value);
        })
        this.setState({fileList:[]})
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
        this.resetForm();
    }

    onChange=({fileList:newFileList}) => {
        this.setState({fileList:newFileList});
    }

    //禁止自动上传
    beforeUpload = (file) => {
        console.log(file)
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            message.error("仅支持上传jpg/png格式的文件");
            return Upload.LIST_IGNORE
        }
        return false;
    }

    columns = [
        {
            title: '图片',
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
            title: 'id',
            dataIndex: 'id',
            //区别颜色
            render: (_, record) => {
                let {tagid, id} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{id}</Tag>
                ) : (<Tag color="orange">{id}</Tag>)
            }
        },
        {
            title: '保存路径',
            dataIndex: 'url',
            //区别颜色
            render: (_, record) => {
                let {tagid, url} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green"><div title = {url} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{url}</div></Tag>
                ) : (<Tag color="orange"><div title = {url} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{url}</div></Tag>)
            }
        },
        {
            title: '显示路径',
            dataIndex: 'url',
            //区别颜色
            render: (_, record) => {
                let {tagid, id} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green"><div title = {`http://49.233.35.127/Wx/Getpic?id=${id}`} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{`http://49.233.35.127/Wx/Getpic?id=${id}`}</div></Tag>
                ) : (<Tag color="orange"><div title = {`http://49.233.35.127/Wx/Getpic?id=${id}`} style={{maxWidth: '150px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{`http://49.233.35.127/Wx/Getpic?id=${id}`}</div></Tag>)
            }
        },
        {
            title: '图片',
            //区别颜色
            render: (_, record) => {
                let { id } = record;
                return (
                    <Image src = {`http://49.233.35.127/Wx/Getpic?id=${id}`} width = '40px'/>
                )
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
                    onClick={() => this.setState({isModalVisible: true, isAdd: true})}>添加图片</Button>}>
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
                            <Input placeholder="请输入图片名" disabled={isAdd ? false : true}/>
                        </Form.Item>
                        <Form.Item
                            label="Img"
                            name="img"
                            rules={[
                                {
                                    required: true,
                                    message: '照片为必填项',
                                }
                            ]}
                        >
                            <Upload 
                                name='img'
                                listType="picture-card"
                                onChange={this.onChange} //0000
                                fileList={this.state.fileList}
                                accept="image/*"
                                beforeUpload={this.beforeUpload.bind(this)}
                            >
                                {this.state.fileList.length < 1 && '上传图片'}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Master;