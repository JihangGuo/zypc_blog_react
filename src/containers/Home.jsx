import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ajax from '../tools/ajax.js'
import __state from '../tools/state.js';
import {Layout, Menu, Breadcrumb, Icon,Divider} from 'antd';
import Article from '../containers/Article.jsx';
import Detail from '../components/Detail.jsx';
import Tags from '../containers/Tags.jsx';
import Setting from '../containers/Setting.jsx';
import Write from '../containers/Write.jsx';
import Draft from '../components/List.jsx';
import ContentCard from '../components/ListAlign.jsx';
import {Route, Switch,Link, HashRouter as Router,} from 'react-router-dom';

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
    componentDidMount(){
        ajax('http://127.0.0.1:8000/api/get_all','post','',(response) => {
            __state.SetState('globalState',response.data);
        })
    }
    render() {
        return (
            <Router>
            <Layout style={{ minHeight: '100vh' }}>
            <div style={{background: '#f0f2f5', padding:8, paddingTop: 20}}>
                <Sider
                style={{background: 'white'}}
                >
                    <div className="logo" style={{
                    background: `url(${__state.globalState.userPic})`,
                    margin: '10px auto',
                    width: 100,
                    height: 100,
                    borderRadius: 100
                    }}/>
                    <p style={{textAlign: 'center', fontSize: 16}}>{__state.globalState.userName}</p>
                    <span>
                            
                            <Link to="/home/write"><Icon type="edit" />写博客</Link>
                            <Divider type="vertical" />
                            
                            <Link to="/home/collection/star"><Icon type="star" />收藏</Link>
                            <Divider type="vertical" />
                            
                            <Link to="/home/collection/draft"><Icon type="delete" />草稿箱</Link>
                    </span>
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{paddingLeft:2, marginTop: 6}}>
                        <Menu.Item key="1">
                        <Link to="/home/article"><Icon type="file" />全部文章</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Link to="/home/tags"><Icon type="tag-o" />标签管理</Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                        <Link to="/home/setting"><Icon type="setting" />个人设置</Link>
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
                        
                            <Switch>
                                <Route path="/home/article/1" component={Detail}/>
                                <Route path="/home/article" component={Article}/>
                                <Route path="/home/tags" component={Tags}/>
                                <Route path="/home/setting" component={Setting}/>
                                <Route path="/home/write" component={Write}/>
                                <Route path="/home/collection/:type" component={ContentCard}/>
                            </Switch>
                        
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ZYPC  Web-developer ©2018
                </Footer>
                </Layout>
            </Layout>
            </Router>
        );
    }
}
export default defaultExport;