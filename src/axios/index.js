import axios from "axios";
import qs from "qs";
import {
    ElMessageBox
} from 'element-plus';
// axios.defaults.baseURL = '/api' //正式
// axios.defaults.baseURL = 'http://10.101.180.97:9091/' //测试
axios.defaults.baseURL = 'http://localhost:10010/' //测试
// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        console.log(response.status,response);
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        ElMessageBox(JSON.stringify(error), '请求异常', {
            confirmButtonText: '确定',
            callback: action => {}
        });
    }
);

export function post(url, data) {
    // console.log(qs.stringify(data));
    return new Promise((resolve, reject) => {
        axios({
                method: 'post',
                url,
                data: data,
            })
            .then(res => {
                // console.log(res);
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            });
    })
}

export function get(url, data) {
    return new Promise((resolve, reject) => {
        axios({
                method: 'get',
                url,
                params: data,
            })
            .then(res => {
                // console.log(res);
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function put(url,data){
    return new Promise((resolve,reject) => {
        axios({
            method: 'put',
            url,
            data:data
        })
        .then(res => {
            // console.log(res);
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        });
    })
}

export function _delete(url,data){
    return new Promise((resolve,reject) => {
        axios({
            method: 'delete',
            url,
            params:data
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)            
        })
    })
}