import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Tag ,Select} from 'antd';
const Option = Select.Option;
class defaultExport extends Component {
    constructor(props) {
        super(props);
        // 设置组件数据state
        this.state = {

        };

        // 函数绑定
        this.handleChange = this.handleChange.bind(this);
        // 全局变量定义
    }

    componentDidMount() {
        
    }

    handleChange = (value) => {
        if (value === "edit") {

        } else if (value === "star") {

        } else if (value === "select") {

        }
    }

    render() {
        return (
            <div>
                <h1 style={{display: "inline-block"}}>article_name</h1>
                <Select style={{ width: 120, float: "right", marginRight: 60 }} placeholder="操作" onChange={this.handleChange}>
                    <Option value="edit">编辑</Option>
                    <Option value="star">收藏</Option>
                    <Option value="select">删除</Option>
                </Select>
                <div>
                    <span>发表于:asxasxasx 阅读：xxx  点赞：xxx</span>
                    <span>评论0</span>
                </div>
                <p>摘要：xxxxxx</p>
                <div>渲染区域</div>
                <p>标签：
                    <Tag color="#f50">#f50</Tag>
                    <Tag color="#2db7f5">#2db7f5</Tag>
                    <Tag color="#87d068">#87d068</Tag>
                    <Tag color="#108ee9">#108ee9</Tag>
                </p>
                <div>
                    
                </div>
            </div>
        );
    }
}
export default defaultExport;