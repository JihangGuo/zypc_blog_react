import React, {Component} from 'react';
import { Row, Col ,Form, Icon, Input, Button,Divider, AutoComplete,Steps, message, Modal,Upload} from 'antd';
import backgroundImg from '../../static/background.png';
import ajax from '../tools/ajax.js'
import __state from '../tools/state.js';
import {observer} from 'mobx-react';
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option = AutoComplete.Option;
const Step = Steps.Step;

@observer
class PasswordFormInit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            originPass: '',
            newPass: '',
            rePass: ''
        };
    }

    onChange = (e, type) => {
        if (type === "one") {
            this.setState({
                originPass: e.target.value
            });
        } else if (type === "two") {
            this.setState({
                newPass: e.target.value
            });
        } else if (type === "three") {
            this.setState({
                rePass: e.target.value
            });
        }
    }

    checkPassword = (value) => {
        var pattern = /^[\w_-]{6,20}$/;
        return pattern.test(value);
    }

    next() {
        if (this.state.current === 0 && this.checkPassword(this.state.originPass)) {
            // 进行原密码判断与进行密码规则校验
            ajax('http://127.0.0.1:8000/api/setting','post',{type:"change_pass",step:1,userPass: this.state.originPass},(response) => {
                  if (response.status === 1) {
                        const current = this.state.current + 1;
                        this.setState({ current });
                  } else {
                        message.error('输入原密码错误');
                  }
            });
        } else if (this.state.current === 1 && this.checkPassword(this.state.newPass)) {
            const current = this.state.current + 1;
            this.setState({ current });
        } else {
            message.error('密码格式输入错误');
        }
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    done() {
        // 进行输入值比较与规则校验
        if (this.checkPassword(this.rePass) && this.state.rePass === this.state.newPass) {
            // 数据库更改
            ajax('http://127.0.0.1:8000/api/setting','post',{type:"change_pass",step:2,userPass: this.state.rePass},(response) => {
                  // 清除相关值 退出弹出框
                  if (response.status === 1) {
                        message.success('修改成功');
                        this.setState({
                            originPass: '',
                            newPass: '',
                            rePass: '',
                            current: 0
                        });
                        this.props.closeModal();  
                  } else {
                        message.error('网络错误，修改失败');
                  }
            });
        } else {
            message.error('与新密码不符');
        }
    }
    render() {
        const { current } = this.state;
        const { userName } = this.state;
        const steps = [
            {
                title: "请输入原密码",
                content: <Input
                            type="password"
                            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.originPass}
                            onChange={(e) => this.onChange(e, "one")}  
                        />
            },
            {
                title: "请输入新密码",
                content: <Input
                            type="password"
                            prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.newPass}
                            onChange={(e) => this.onChange(e, "two")}
                        />
            },
            {
                title: "请再次输入新密码",
                content: <Input
                            type="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}   
                            value={this.state.rePass}
                            onChange={(e) => this.onChange(e, "three")}  
                        />
            }
        ]
        return (
            <div>
                <Steps current={current} size="small">
                {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div style={{padding: 30}} className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                {
                    this.state.current < steps.length - 1
                    &&
                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {
                    this.state.current === steps.length - 1
                    &&
                    <Button type="primary" onClick={() => this.done()}>修改</Button>
                }
                {
                    this.state.current > 0
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        上一步
                    </Button>
                }
                </div>
            </div>
        )
    }

}
const PasswordForm = Form.create()(PasswordFormInit);

@observer
class UserFormInit extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            result: [],
            confirmDirty: false,
            visible: false
        };
        this.onFindTimer;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            
            if (!err) {
                ajax('http://127.0.0.1:8000/api/setting','post',{type:"change_info",userName: values.signName,userEmail:values.signEmail,userPhone:values.signPhone},(response) => {
                    __state.SetState('globalState',response.data);
                    message.success("修改成功");
                });
            }
        })
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

    
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    closeModal = () =>{
        this.setState({
            visible: false,
        });
    }


    componentDidMount() {
        // 获取用户初始值
        this.props.form.setFieldsValue({
            signEmail: __state.globalState.userEmail,
            signName: __state.globalState.userName,
            signPhone: __state.globalState.userPhone
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {result} = this.state;
        const children = result.map((email) => {
            return <Option key={email}>{email}</Option>;
        });
        return (
                    <Form onSubmit={(e) => this.handleSubmit(e)} className="change-form" layout="vertical">
                        <FormItem label="联系邮箱">
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
                        <FormItem label="用户昵称">
                            {getFieldDecorator('signName', {
                                rules: [{required: true, message: '请输入你的名字', type:'string', max:30, min:6}],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem label="联系号码">
                            {getFieldDecorator('signPhone', {
                                rules: [{ required: true, message: '请输入你的号码', type: 'string', len: 11}],
                            })(
                                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="电话" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="danger" onClick={this.showModal} className="login-form-button">
                                修改密码
                            </Button>
                            <Button style={{marginLeft: 16}} type="primary" htmlType="submit" className="login-form-button">
                                确定修改
                            </Button>
                        </FormItem>
                        <Modal
                            width= {600}
                            title="修改密码"
                            visible={this.state.visible}
                            footer={null}
                            onCancel={this.closeModal}
                        >
                            <PasswordForm closeModal={this.closeModal}/>
                        </Modal>
                    </Form>
        );
    }
}
const UserForm = Form.create()(UserFormInit);

@observer
class defaultExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    // getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
      
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/gif' || 'image/png';
        if (!isJPG) {
          message.error('只能提交jpeg、jeg、gif、png格式的哦!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          message.error('Image must smaller than 10MB!');
        }
        return isJPG && isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
          //
          this.setState({
            loading: false,
          },() => {
            __state.SetState('globalState',{userPic:info.file.response.data.userPic});
          });
        }
      }
    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = __state.globalState.userPic;
        return (
            <div>
                <h2 style={{borderBottom: "1px #e1e4e8 solid"}}>个人设置</h2>
                <Row gutter={16}>
                    <Col span={16}>
                        <UserForm />
                    </Col>
                    <Col span={8}>
                        <Dragger
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://127.0.0.1:8000/api/setting"
                        data={{type:"change_img"}}
                        withCredentials={true}
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        >
                            {imageUrl ? <img style={{width: "100%"}} src={imageUrl} alt="" /> : uploadButton}
                        </Dragger>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default defaultExport;