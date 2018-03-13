import axios from 'axios';
import {message} from 'antd';

const model = 'dev';

// 数据模拟注册表
let requestDist = {
    '/api/login': {
        'status': 0,
        'msg': '',
        'data': {
            'userId': 123123,
            'userName': '郭大帅',
            'blogName': '大帅的空间',
            'userPic': '/public/img/userpic/123123.png'
        }
    },
    '/api/signin': {
        'status': 0,
        'msg': '',
        'data': ''
    },
    '/api/check_name': {
        'status': 0,
        'msg': '',
        'data': ''
    }
};

function request(url,type,params) {
    if (model === "dev") {
        return ajaxDev(url,type,params)
    } else {
        return ajaxProd(url,type,params);
    }
}

function ajaxDev(url,type,params) {
    if (url in requestDist) {
        console.log(`请求数据地址为：\n ${url} \n 请求类型为： \n ${type} \n 请求参数为：`);
        console.log(params);
        console.log('返回数据为：');
        console.log(requestDist[url]);
        return requestDist[url];
    } else {
        console.log(`请求数据地址未注册`);
    }
}

function ajaxProd(url,type,params) {
    if (type === 'get') {
        axios.get(url, {
            params: params
        })
        .then((response) => {
            return response.data;
        })
        .catch(function (error) {
            message.error(error);
        });
    } else if (type === 'post') {
        axios.post(url, {
            params
        })
        .then((response) => {
            return response.data;
        })
        .catch(function (error) {
            message.error(error);
        });
    }
}

export default function(url,type,params) {
    return request(url,type,params);
}