import axios from 'axios'
import { getToken } from './auth.js'
/* 
    data: {
        url: ''  // 请求路径
        data: {} // 请求参数
        name: '' // 文件名
    }
*/
export default function (data) {
    axios({
        url: data.url,
        method: 'get',
        responseType: 'blob',
        headers: {
            Authentication: getToken()
        }
    }).then(res => {
        var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'});
        var filename = data.name + '.xlsx';
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download =filename ; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
    })
}