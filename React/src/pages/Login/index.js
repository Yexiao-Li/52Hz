import React, {Component} from 'react';
import {reqLogin} from "../../api/index";
import {saveUserInfo} from "../../util";
import {Row, Col, Form, Input, Button, Typography, message} from "antd";
import { UserOutlined, LockOutlined , LoginOutlined} from '@ant-design/icons';
import "./login.css";

const { Title } = Typography;

class Login extends Component {

    onFinish = async (value) => {
        let {history} = this.props;
        let admin = value;
        let result = await reqLogin(admin);
        let {status, data, msg} = result;
        console.log(result)
        if (status === 1) {
            message.error(msg);
            return;
        }
        if(data == '密码错误'){
            alert(data)
            return
        }
        console.log(data[0])
        saveUserInfo(data[0]);
        message.success(`登陆成功，欢迎你：${value.username}`);
        history.replace("/admin/home")
    }

    render() {
        return (
            <>
                <Row className="container">
                    <Col span={8} offset={8} className="main">
                        <div>
                            <Title level={5} >管理员登陆</Title>
                        </div>
                        <div>
                            <Form
                                name="normal_login"
                                onFinish={this.onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入用户名",
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                           placeholder="用户名" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Login;