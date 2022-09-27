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
    if (method != 'GET') {
        response.statusCode = 405
        response.end()
        return
    }
    // response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // /index.html => index.html
    let filename = pathname?.substring(1);
    if (filename == '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename as string), (error, data) => {
        if (error) {
            console.log(error)
            if (error.errno == -4058) {
                response.statusCode = 404
                fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                    response.end(data)
                })
            } else if (error.errno == -4068) {
                response.statusCode = 403
                response.end('无权查看内容')
            } else {
                response.statusCode = 500
                response.end('服务器繁忙，请稍后再试')
            }
        } else {
            response.end(data)
        }

    })
}),



    //启动http服务器监听连接                                         
    server.listen(8888);
