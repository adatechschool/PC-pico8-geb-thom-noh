const http = require('http');
const { parse } = require('querystring');

const hostname = '192.168.7.206';
const port = '4444';

let pinsValues = createEmptyValueObject(128);

console.log(pinsValues);


function createEmptyValueObject(n){
    let obj = {};
    for (let i =0; i<n;i++) obj[i.toString()]='';
    return obj;
}

const server = http.createServer((req,res)=>{
    res.statusCode=200;
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            pBody = parse(body);
            console.log(req.socket.remoteAddress);
            reqKeys = Object.keys(pBody);
            for (key in reqKeys){
                pinsValues[key] = pBody[key]; 
            }
            res.end();
        });
    }
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(pinsValues));
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server Running at http://${hostname}:${port}/`);
});
