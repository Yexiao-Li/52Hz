import React, {Component} from 'react';
import {reqSong, reqUpdateSong, reqDeleteSong, reqAddSong} from "../../../api";
import {LIMIT} from "../../../config";
import {
    Table, message, Form, Input,
    Card, Button, Space, Modal,
    Popconfirm, Radio, Upload,
    Tag
} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

class Song extends Component {

    state = {
        dataSource: [],
        total: 0,
        isModalVisible: false,//是否更新
        isAdd: false,
        current: 1,
        fileList:[],
        fileResult:''
    }

    formRef = React.createRef();//创建引用

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource = async () => {
        let {current} = this.state;
        let {status, data} = await reqSong(current);
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
    initEditSong = (data) => {
        let {name, type, singer, album, audio, id} = data;
        this.formRef.current.setFieldsValue({name, type, singer, album, audio, id});//引用init的current并使用setFieldValue更新表单值
        this.setState({isAdd: false, isModalVisible: true, id: id});
    }

    deleteSong = async (data) => {
        let {status, msg} = await reqDeleteSong(data.id, data.name, data.singer);
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

    addSong = () => {
        console.log(1)
        this.formValidate(reqAddSong);
    }

    // 校验表单并提交数据
    formValidate = (func) => {
        this.formRef.current.validateFields().then(async value => {
            value.audio.fileList[0].thumbUrl = this.state.fileResult
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
            this.addSong();
            return;
        }
        this.editSong();
    }

    editSong = () => {
        this.formValidate(value => {
            return reqUpdateSong(value);
        })
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
        this.resetForm();
    }

    onChange=({fileList: newFileList}) => {
        this.setState({fileList:newFileList});
    }

    //禁止自动上传
    beforeUpload = (file) => {
        const that = this
        var reader = new FileReader();
        let fileResult = ''
        reader.readAsDataURL(file);
        reader.onload = function(){
            // 显示图片
            fileResult = reader.result;
            that.setState({fileResult:fileResult})
        }
        if (file.type !== "audio/mpeg" && file.type !== "audio/flac") {
            message.error("仅支持上传mp3/flac格式的文件");
        }
        return false
    }
    columns = [
        {
            title: '歌曲名',
            dataIndex: 'Name',
            //区别颜色
            render: (_, record) => {
                let {tagid, name} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green" >{name}</Tag>
                ) : (<Tag color="orange">{name}</Tag>)
            }
        },
        {
            title: '歌曲类别',
            dataIndex: 'Type',
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
            dataIndex: 'Singer',
            //区别颜色
            render: (_, record) => {
                let {tagid, singer} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{singer}</Tag>
                ) : (<Tag color="orange">{singer}</Tag>)
            }
        },
        {
            title: '专辑',
            dataIndex: 'Album',
            //区别颜色
            render: (_, record) => {
                let {tagid, album} = record;
                return (tagid % 2 === 0) ? (
                    <Tag color="green">{album}</Tag>
                ) : (<Tag color="orange">{album}</Tag>)
            }
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="small">
                        <Button size="small" icon={<EditOutlined/>} onClick={() => this.initEditSong(data)}/>
                        <Popconfirm
                            title="确定删除吗？"
                            onConfirm={() => this.deleteSong(data)}
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
                    onClick={() => this.setState({isModalVisible: true, isAdd: true})}>添加歌曲</Button>}>
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
                            <Input placeholder="请输入歌曲名"/>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="type"
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
                              <Radio.Button value="其他">其他</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Singer"
                            name="singer"
                            rules={[
                                {
                                    required: true,
                                    message: '歌手为必填项',
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
                            label="Album"
                            name="album"
                            rules={[
                                {
                                    whitespace: true,
                                    message: '不能输入空格',
                                }
                            ]}
                        >
                            <Input placeholder="请输入专辑名"/>
                        </Form.Item>
                        <Form.Item
                            label="Audio"
                            name="audio"
                            rules={[
                                {
                                    required: true,
                                    message: '必须上传文件',
                                }
                            ]}
                        >
                            <Upload 
                                name='audio'
                                listType="picture"
                                onChange={this.onChange} //0000
                                fileList={this.state.fileList}
                                accept="audio/*"
                                beforeUpload={this.beforeUpload.bind(this)}
                            >
                                {this.state.fileList.length < 1 && '上传音乐'}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Song;