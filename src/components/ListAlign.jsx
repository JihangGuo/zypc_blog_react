import React, {Component} from 'react';
import { Card, List,Icon} from 'antd';

class defaultExport extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            pageType: '',
            contentData: [
                {
                  title: 'Title 1',
                  content: '我是内容'
                },
                {
                  title: 'Title 2',
                  content: '我是内容'
                },
                {
                  title: 'Title 3',
                  content: '我是内容'
                },
                {
                  title: 'Title 4',
                  content: '我是内容'
                },
                {
                  title: 'Title 5',
                  content: '我是内容'
                },
                {
                  title: 'Title 6',
                  content: '我是内容'
                },
            ]
        };

        // 函数绑定

        // 全局变量定义

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.type !== this.props.match.params.type)
        {
            this.setState({
                pageType: nextProps.match.params.type
            });
        }
    }
    componentDidMount() {
        this.setState({
            pageType: this.props.match.params.type
        });
    }
    render() {
        return (
            <div>
                <h2>{this.state.pageType === 'star'?"收藏夹":"草稿箱"}</h2>
                <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={this.state.contentData}
                renderItem={item => (
                  <List.Item>
                    <Card actions={[<Icon type="enter" />, <Icon type="ellipsis" />]} hoverable={true} title={item.title}>{item.content}</Card>
                  </List.Item>
                )}
              />
            </div>
        );
    }
}
export default defaultExport;