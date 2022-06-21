import React, {Component} from 'react';
import {reqSinger, reqUpdateSinger, reqDeleteSinger, reqAddSinger} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Radio, Upload,
    Tag, Image
} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

class Singer extends Component {
    constructor(){
        super()
        this.state = {
            dataSource: [],
            total: 0,
            isModalVisible: false,//是否更新
            isAdd: false,
            current: 1,
            fileList: []
        }
    }
    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqSinger(current);
        if (status === 1) {
            message.error("网络异常")
            return
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
        let {current} = pageInfo
        console.log(pageInfo)
        this.setState({current}, () => {
            this.initDataSource()
        });
    }

    // 更新表单值
    initEditMaster = (data) => {
        let {ID, Name, Sex, Class, img} = data
        this.formRef.current.setFieldsValue({ID, Name, Sex, Class, img})//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true})
    }

    deleteMaster = async (data) => {
        let {status, msg} = await reqDeleteSinger(data.ID)
        console.log({status, msg})
        if (status === 200) {
            message.success(msg)
            this.initDataSource()
            return;
        }
        message.error(msg);
    }

    resetForm = () => {
        this.formRef.current.resetFields()
    }

    addMaster = () => {
        this.formValidate(reqAddSinger)
        this.setState({fileList:[]})
    }

    // 校验表单并提交数据
    formValidate = (func) => {
        this.formRef.current.validateFields().then(async value => {
            let {status, msg} = await func(value);
            this.state.fileList=[];
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
            return reqUpdateSinger(value);
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
            title: '歌手名',
            dataIndex: 'Name',
            //区别颜色
            render: (_, record) => {
                let {tagid, Name} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{Name}</Tag>
                ) : (<Tag color="orange">{Name}</Tag>)
            }
        },
        {
            title: '性别',
            dataIndex: 'Sex',
            //区别颜色
            render: (_, record) => {
                let {tagid, Sex} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{Sex}</Tag>
                ) : (<Tag color="orange">{Sex}</Tag>)
            }
        },
        {
            title: '风格',
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
            title: '头像',
            dataIndex: 'Img',
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
                    onClick={() => this.setState({isModalVisible: true, isAdd: true})}>添加歌手</Button>}>
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
                            name="ID"
                        >
                            <span>请编辑</span>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="Name"
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
                            name="Sex"
                            label="Sex"
                            rules={[
                              {
                                required: true,
                                message: '请选择类别',
                              },
                            ]}
                          >
                            <Radio.Group>
                              <Radio.Button value="男">男</Radio.Button>
                              <Radio.Button value="女">女</Radio.Button>
                              <Radio.Button value="乐队">乐队</Radio.Button>
                            </Radio.Group>
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
                        <Form.Item
                            label="Img"
                            name="img"
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

export default Singer;