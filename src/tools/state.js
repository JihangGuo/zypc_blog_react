/**
 * @file: 文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-24 15:11:16
 * @email: guojihang@baidu.com 
 */

import {observable, autorun, action} from 'mobx';

class Store {
    @observable logState = {
        'logName': "",
        'isFirst': false
    };

    @observable globalState = {
        'userName': '未登录',
        'userPhone': '',
        'userEmail': '', 
        'blogName': '',
        'userPic': ''
    };

    @action SetState(type, object) {
        for (let key in object) {
            this[type][key] = object[key];
        }
        // switch (type){
        //     case 'logState':
        //         for (let key in object) {
        //             this.logState[key] = object[key];
        //         }
        //         break;
        //     case 'globalState':

        //         break;
        // }
    }
}

const store = new Store();
export default store;