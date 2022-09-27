import * as fs from 'fs'
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'
import * as p from 'path'
const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public')
//每次请求都会触发这个函数
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url, headers } = request
    switch (url) {
        case '/index.html':
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error;
                response.end(data.toString())
            })
            break
        case '/style.css':
            response.setHeader('Content-Type', 'text/css;charset=utf-8')
            fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
                if (error) throw error;
                response.end(data.toString())
            })
            break
        case '/main.js':
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')

            fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error;
                response.end(data.toString())
            })
            break
    }
}),



    //启动http服务器监听连接                                         
    server.listen(8888);
