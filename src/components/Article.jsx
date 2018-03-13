import React, {Component} from 'react';
import {observer} from 'mobx-react';
import __state from '../tools/state.js';
import moment from 'moment';
import {Row, Col, Card, Icon, Avatar, Timeline, Breadcrumb, Input, DatePicker} from 'antd';
import {Link} from 'react-router-dom';
const { Meta } = Card;
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

@observer
class defaultExport extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            checkSearch: true
        };

        // 函数绑定
        this.onChange = this.onChange.bind(this);
        this.switchSearch = this.switchSearch.bind(this);
        this.getDetail = this.getDetail.bind(this);
        // 全局变量定义
    }
    onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    switchSearch = () => {
        this.setState({
            checkSearch: !this.state.checkSearch
        });
    }
    getDetail = () => {
        location.replace("/home/detail/111");
    }

    render() {
        return (
            <div>
                <div style={{margin: '0 auto', width: 300, paddingBottom: 40}}>
                    <Breadcrumb style={{margin: 10}}>
                        <Breadcrumb.Item><a onClick={this.switchSearch}>按标题搜索</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a onClick={this.switchSearch}>按时间搜索</a></Breadcrumb.Item>
                    </Breadcrumb>
                    {this.state.checkSearch
                    ? <Search
                    placeholder="请输入文章标题"
                    onSearch={value => console.log(value)}
                    enterButton
                    />
                    : <RangePicker
                    ranges={{Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')]}}
                    onChange={this.onChange}
                    />}
                </div>
                <Timeline>
                    <Timeline.Item>
                        <p>2015-09-01</p>
                        <Row gutter="8" type="flex">
                            <Col  xs={12} sm={8} md={6} >
                                <Card
                                title="title"
                                extra={<Link to='/home/article/1'>More</Link>}
                                loading={false}
                                hoverable={true}
                                >
                                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                </Card>
                            </Col>
                            <Col  xs={12} sm={8} md={6} >
                                <Card
                                title="title"
                                extra={<Link to='/home/article/1'>More</Link>}
                                loading={false}
                                hoverable={true}
                                >
                                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                </Card>
                            </Col>
                            <Col  xs={12} sm={8} md={6} >
                                <Card
                                title="title"
                                extra={<Link to='/home/article/1'>More</Link>}
                                loading={false}
                                hoverable={true}
                                >
                                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                </Card>
                            </Col>
                            <Col  xs={12} sm={8} md={6} >
                                <Card
                                title="title"
                                extra={<Link to='/home/article/1'>More</Link>}
                                loading={false}
                                hoverable={true}
                                >
                                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                                </Card>
                            </Col>
                        </Row>

                    
                        
                    </Timeline.Item>
                    <Timeline.Item><p>2015-09-01</p></Timeline.Item>
                    <Timeline.Item><p>2015-09-01</p></Timeline.Item>
                    <Timeline.Item><p>2015-09-01</p></Timeline.Item>
                </Timeline>
                
            </div>
        );
    }
}
export default defaultExport;