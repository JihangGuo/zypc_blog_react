
/**
 * @file: 文件 
 * @author: JihangGuo 
 * @last Modified time: 2018-02-02 14:20:20 
 * @email: guojihang@baidu.com 
 */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './containers/Main.jsx';
import LogPage from './containers/LogPage.jsx';
import NotFound from './components/NotFound.jsx';
import Home from './containers/Home.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/log" component={LogPage} />
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Main} />
                    <Route path="/" component={NotFound} />
                </Switch>
            </Router>
        );
    }
}
export default App;
