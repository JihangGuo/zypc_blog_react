import axios from 'axios';
import {message} from 'antd';

// 创建axios实例
const _axios = axios.create({
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    // headers: {  
      // "Content-Type": "application/x-www-form-urlencoded"
    // },
    withCredentials: true // 允许携带cookie
  })


const model = 'prod';

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

function request(url,type,params,callback) {
    if (model === "dev") {
        return ajaxDev(url,type,params,callback)
    } else if (model === "prod"){
        return ajaxProd(url,type,params,callback);
    }
}

function ajaxDev(url,type,params,callback) {
    if (url in requestDist) {
        console.log(`请求数据地址为：\n ${url} \n 请求类型为： \n ${type} \n 请求参数为：`);
        console.log(params);
        console.log('返回数据为：');
        console.log(requestDist[url]);
        callback(response.data);
    } else {
        console.log(`请求数据地址未注册`);
    }
}

function ajaxProd(url,type,params,callback) {
    if (type === 'get') {
        _axios.get(url, {
            params
        })
        .then((response) => {
            callback(response.data);
        })
        .catch(function (error) {
            message.error(error);
        });
    } else if (type === 'post') {
        _axios.post(url, {
            params
        })
        .then((response) => {
            callback(response.data);
        })
        .catch(function (error) {
            message.error(error);
        });
    }
}

export default function(url,type,params,callback) {
    return request(url,type,params,callback);
}