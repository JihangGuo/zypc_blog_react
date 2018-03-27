import React, {Component} from 'react';
import { List, Avatar, Icon } from 'antd';

class defaultExport extends Component {
    constructor(props) {
        super(props);

        // 设置组件数据state
        this.state = {
            
        };

        // 函数绑定

        // 全局变量定义

        this.listData = [];
        this.pagination;
        for (let i = 0; i < 5; i++) {
            this.listData.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
            this.pagination = {
                pageSize: 10,
                current: 1,
                total: this.listData.length,
                onChange: (() => {}),
            };
        }
    }
    

    render() {
        let IconText = ({ type, text }) => (
        <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
        </span>
    );
        return (
            <div>
                <List
                    style={{padding: '10px'}}
                    itemLayout="vertical"
                    size="large"
                    pagination={this.pagination}
                    dataSource={this.listData}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}
export default defaultExport;