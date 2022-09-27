import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'
const server = http.createServer();

//每次请求都会触发这个函数
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('request.method')
    console.log(request.method)
    console.log('request.url')
    console.log(request.url)
    console.log('request.headers')
    console.log(request.headers)
    const array = [] as any
    request.on('data', (chunk) => {
        array.push(chunk)
    })
    request.on('end', () => {
        const body = Buffer.concat(array).toString()
        console.log('body')
        console.log(body)

        // response.statusCode = 404
        //设置header
        // response.setHeader('X-MiMachi', 'Im jiang')
        // write API 可以调用多次
        response.write('1\n')
        response.write('2\n')
        response.write('3\n')

        //读取图片 imageData是二进制图片格式
        // response.setHeader('Content-Type','image/png')
        // response.write(imageData)
        response.end()
    })
})


//启动http服务器监听连接                                         
server.listen(8888, () => {
    console.log(server.address())
});
