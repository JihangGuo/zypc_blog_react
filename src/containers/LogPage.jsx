import React, {Component} from 'react';
import {Layout, Form, Icon, Input, Button, Checkbox, Tabs, Divider, AutoComplete, message, Col, Row} from 'antd';
import ajax from '../tools/ajax.js'
import __state from '../tools/state.js';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import backgroundImg from '../../static/background.png';

const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = AutoComplete.Option;

// 表单组件定义
@observer
class logForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            confirmDirty: false
        };
        this.onFindTimer;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.checkName = this.checkName.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formType === 'login' && __state.logState.logName !== '' && __state.logState.isFirst) {
            this.props.form.setFieldsValue({
                logName: __state.logState.logName
            });
            __state.SetState('logState',{'isFirst': false});
        }
    }

    handleSubmit = (e,type) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.formType === 'login') {
                    // 进行表单上传
                    let response = ajax('/api/login','post', values);
                    if (response.status === 0) {
                        // 跳转至主页
                        __state.SetState('globalState',response.data);
                        location.replace("#/home");
                    } else {
                        this.props.form.setFields({'logPass': {
                            errors: [new Error('密码错误或用户不存在')]
                        }})
                    }
                } else if (this.props.formType === 'signin') {
                    // 进行表单上传
                    let response = ajax('/api/signin','post', values);
                    if (response.status === 0) {
                        message.success('注册成功！');
                        // 进行跳转
                        __state.SetState('logState',{'logName':values.signName,'isFirst': true});
                        this.props.checkSign();
                    }
                }
                
            }
        });
    }

    handleSearch = (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
          result = [];
        } else {
          result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }

    checkName = () => {
        clearTimeout(this.onFindTimer);
        this.onFindTimer = setTimeout(() => {
            let signName = this.props.form.getFieldValue('signName');
            let response = ajax('/api/check_name','get', signName);
            if (response.status !== 0) {
                this.props.form.setFields({
                    'signName': {
                      value: signName,
                      errors: [new Error('已经存在这个昵称啦')],
                    },
                  });
            }
        },400)
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkConfirm = (rule, value, callback) => {
        console.log(value)
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['signRePass'], {force: true});
        }
        callback();
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('signPass')) {
            callback('与设置密码不符合');
        } else {
            callback();
        }
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const {result} = this.state;
        const children = result.map((email) => {
            return <Option key={email}>{email}</Option>;
        });
        return(
            <div>
                {this.props.formType === 'login'
                ? <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">            
                    <FormItem>
                        {getFieldDecorator('logName', {
                            rules: [{ required: true, message: '请输入你的用户名', type:'string' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('logPass', {
                            rules: [{ required: true, message: '请输入密码'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="用户密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        <a href="">忘记密码？</a>
                    </FormItem>
                </Form>
                : <Form onSubmit={(e) => this.handleSubmit(e)} className="sign-form">
                    <FormItem>
                        {getFieldDecorator('signEmail', {
                            rules: [{ required: true, message: '请输入有效的邮箱', type:'email' }],
                        })(
                            <AutoComplete
                            prefix={<Icon type="layout" />}
                            onSearch={this.handleSearch}
                            placeholder="联系邮箱"
                            >
                            {children}
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('signName', {
                            rules: [{required: true, message: '请输入你的名字', type:'string', max:30, min:4}],
                        })(
                            <Input onChange={this.checkName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('signPhone', {
                            rules: [{ required: true, message: '请输入你的号码', type: 'string', len: 11}],
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="电话" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('signPass', {
                            rules: [{ required: true, message: '请设置密码', max:20, min:6},
                            {
                                validator: this.checkConfirm
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="设置密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('signRePass', {
                            rules: [{ required: true, message: '与原密码不一致', max:20, min:6},
                            {
                                validator: this.checkPassword
                            }],
                        })(
                            <Input prefix={<Icon type="filter" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="重复密码"  onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem style={{borderTop: '1px solid rgb(171, 171, 171)'}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            确定注册
                        </Button>
                    </FormItem>
                </Form>}
            </div>
        );
    }
}
const LogComponent = Form.create()(logForm);

@observer
class defaultExport extends Component {
    constructor(props) {
        super(props);
        // 设置组件数据state
        this.state = {
           indexKey: '1'
        };
       
        // 函数绑定
        this.checkSign = this.checkSign.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        // 全局变量定义
    }
    checkSign = () => {
        this.setState({
            indexKey: '1'
        });
    }
    onTabClick = (index) => {
        if (index === '1') {
            this.setState({
                indexKey: '1'
            });
        } else {
            this.setState({
                indexKey: '2'
            });
        }
    }
    render() {
        return (
            <div style={{background: `url(${backgroundImg})`, height: '100%'}}>
                <Row align="middle" type="flex" style={{height: '100%'}}>
                    <Col span={11} offset={12}>
                        <div style={{boxShadow:'0 2px 8px #f0f1f2', background:'white', padding: '10px', borderRadius: '10px', minWidth: '450px'}}>
                        <h1>群博系统</h1>
                        <Tabs activeKey={this.state.indexKey} onTabClick={this.onTabClick}>
                            <TabPane tab={<span><Icon type="cloud" />登陆</span>} key="1" forceRender={true}>
                                <LogComponent formType="login" />
                            </TabPane>
                            <TabPane tab={<span><Icon type="cloud-download" />注册</span>} key="2" forceRender={true}>
                                <LogComponent formType="signin"  checkSign={this.checkSign} />
                            </TabPane>
                        </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default defaultExport;