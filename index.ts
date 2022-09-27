import * as fs from 'fs'
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'
import * as p from 'path'
import * as url from 'url'
const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public')
//每次请求都会触发这个函数
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: path, headers } = request
    console.log(path)
    const { pathname, search } = url.parse(path as string)
    // response.setHeader('Content-Type', 'text/html;charset=utf-8')
    const filename = pathname?.substring(1);
    fs.readFile(p.resolve(publicDir, filename as string), (error, data) => {
        if (error) {
            response.statusCode = 404
            response.end('你要的文件不存在')
        } else {
            response.end(data.toString())
        }

    })
}),



    //启动http服务器监听连接                                         
    server.listen(8888);
