import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input, Icon ,Row,Col,Tag, Tooltip,Button,Switch} from 'antd';
const { TextArea } = Input;
const ButtonGroup = Button.Group;
class defaultExport extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            textValue: '',
            userName: '',
            inputRows: 2,
            tags: ['Unremovable', 'Tag 2', 'Tag 3'],
            inputVisible: false,
            inputValue: '',
        };

        // 函数绑定
        this.handleChange = this.handleChange.bind(this)
        // 全局变量定义
        
        this.modules = {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link'],
            ],
          }
    }
    componentDidMount(){
        
    }
    handleChange(value) {
        this.setState({ textValue: value })
        console.log(value);
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
      }
      onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
      }
      showPoint = (type) => {
          if (type === "in") {
              this.setState({
                inputRows: 5
              });
            
          } else if (type === "out") {
            this.setState({
                inputRows: 2
            });
          }
      }

      handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }
    
      saveInputRef = input => this.input = input
    
    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <div>
                <Row style={{marginBottom:3}}>
                    <Col span={12} offset={6}>
                        <Input
                            className="titleInput"
                            style={{border:"none"}}
                            placeholder="输入文章标题"
                            suffix={suffix}
                            value={userName}
                            onChange={this.onChangeUserName}
                            ref={node => this.userNameInput = node}
                        />
                    </Col>
                </Row>
                <Row style={{paddingBottom:10,borderBottom: "1px solid #ddd"}}>
                    <Col span={12} offset={6}>
                        <TextArea onFocus={() => this.showPoint("in")} onBlur={() => this.showPoint("out")} placeholder="输入文章摘要" style={{border:"none"}} rows={this.state.inputRows} />
                    </Col>
                </Row>
                <Row style={{margin:'12px 0'}}>
                    <Col span={22} offset={1}>
                        <ReactQuill
                        modules={this.modules} 
                        onChange={this.handleChange}
                        placeholder="来写博客啦"
                        />
                    </Col>
                </Row>
                <Row style={{margin:'20px 0'}}>
                    <Col offset={1}>
                {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
                )}
                {!inputVisible && (
                <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                    <Icon type="plus" /> New Tag
                </Tag>
                )}
                </Col>
                </Row>
                <Row type="flex" justify="space-between" style={{margin:'12px 0'}}>
                    <Col span={14} offset={2}>
                        <p style={{display: "inline-block",marginRight: 10}}>是否所有人可见</p>
                        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
                    </Col>
                    <Col span={6}>
                    <ButtonGroup>
                        <Button type="dashed">
                            <Icon type="inbox" />草稿
                        </Button>
                        <Button type="primary">
                            发布<Icon type="rocket" />
                        </Button>
                    </ButtonGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default defaultExport;