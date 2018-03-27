import React, {Component} from 'react';
import { Tag, Input, Tooltip, Icon ,Modal,message} from 'antd';
const confirm = Modal.confirm;

class defaultExport extends Component {
    constructor(props) {
        super(props);
        // 设置组件数据state
        this.state = {
            tags: ['Unre', 'Tag 2', 'Tag 3'],
            inputVisible: false,
            inputValue: '',
        };

        // 函数绑定
        this.behindClose = this.behindClose.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTags = this.renderTags.bind(this);
        this.onChange = this.onChange.bind(this);
        // 全局变量定义
        const { tags, inputVisible, inputValue } = this.state;
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }
    behindClose = (e, removedTag) => {
            e.preventDefault();
            confirm({
                cancelText: "取消",
                okText: "确定",
                title: `确定删除  标签吗？`,
                onOk: () => {
                    this.handleClose(removedTag);
                }
            });
    }
    
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    
    onChange = (tag) => {
        console.log("选中的是      ",tag);
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        } else if (tags.indexOf(inputValue) !== -1) {
            message.warning('已经有相同的标签啦')
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        });
        
    }
    
    saveInputRef = input => this.input = input
   
    renderTags = (tags) => {
        return tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
                <Tag key={tag} onClick={() => this.onChange(tag)} closable onClose={(e) => {this.behindClose(e, tag)}}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })
    }

    render() {
        return (
            <div>
                {this.renderTags(this.state.tags)}
                {this.state.inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
                )}
                {!this.state.inputVisible && (
                <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                    <Icon type="plus" /> 增加新标签
                </Tag>
                )}
            </div>
        );
    }
}
export default defaultExport;