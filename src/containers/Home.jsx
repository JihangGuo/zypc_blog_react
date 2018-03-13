import React, {Component} from 'react';
import {observer} from 'mobx-react';
import __state from '../tools/state.js';
import { Layout, Menu, Breadcrumb, Icon,Divider } from 'antd';
import Article from '../components/Article.jsx'
import Detail from '../components/Detail.jsx'
import {Route, Link} from 'react-router-dom';
const {Header, Content, Footer, Sider} = Layout;
@observer
class defaultExport extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            collapsed: false
        };

        // 函数绑定
        
        // 全局变量定义
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <div style={{background: '#f0f2f5', padding:8, paddingTop: 20}}>
                <Sider
                style={{background: 'white'}}
                >
                    <div className="logo" style={{
                    background: 'black',
                    margin: '10px auto',
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundSize:'100px 100px',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition : 'center center'
                    }}/>
                    <p style={{textAlign: 'center', fontSize: 16}}>{__state.globalState.userName}</p>
                    <span>
                            
                            <a href="#"><Icon type="edit" />写博客</a>
                            <Divider type="vertical" />
                            
                            <a href="#"><Icon type="star" />收藏</a>
                            <Divider type="vertical" />
                            
                            <a href="#"><Icon type="delete" />垃圾桶</a>
                    </span>
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{paddingLeft:2, marginTop: 6}}>
                        <Menu.Item key="1">
                        <Link to="/home/article"><Icon type="file" />全部文章</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Link to="/home"><Icon type="tag-o" />标签管理</Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                        <Link to="/home"><Icon type="setting" />个人设置</Link>
                        </Menu.Item>
                    </Menu>
                    <div style={{height: 10, background: '#f0f2f5'}} />
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{paddingLeft:2, marginTop: 6}}>
                        <Menu.Item key="1">
                        <Icon type="file" />
                        <span>待定</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Icon type="tag-o" />
                        <span>待定</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                        <Icon type="setting" />
                        <span>待定</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
               
                </div>
                <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Route path="/home/article" component={Article}/>
                        <Route path="/home/detail" component={Detail}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ZYPC  Web-developer ©2018
                </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default defaultExport;