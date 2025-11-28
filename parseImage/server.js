
import http from 'http';
// import { createReadStream } from 'fs';
import fs from 'fs';
import { splitImageList } from './split.js';
// import { endpointWrap } from './scribe.js';
import { saveFileRequest, mapFileRequest } from '../multiparty/mult.js';
// import chalk from 'chalk';
// import path from 'path';
import { routeLoader } from '../routes/process.js';

const _PORT = 3000;

const routes = routeLoader();

const server = http.createServer((req, res) => {

    // endpointList(req, res, '../cut');
    // const getEndPoint = endpointWrap(path.resolve('../cut'));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // HANDLE PREFLIGHT
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Max-Age", "600");
        res.writeHead(204); // No Content
        return res.end();
    }

    const handler = routes[req.url];

    if(handler) {
        console.log('Handler was triggered');
        return handler(req, res);
    }


    // if(req.url ==='/test' && req.method === 'GET') {
    //     endpointWrap(req, res, '../cut'); // how to generate multiple listeners for request
    // }




    if (req.url === '/upload' && req.method === 'POST') {

        // save into local file -> /upload
        saveFileRequest(req);
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        })
        res.end('Done.');

    }

    if (req.url === '/getImg/pCopy1.png' && req.method === 'GET') {
        const img = fs.readFileSync('../png/' + imgList[0]);
        console.log('Click', 1);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'content-length': img.length
        });

        res.write(img);
        res.end();
        return;
    }

    else if (req.url === '/getImg/pCopy2.png' && req.method === 'GET') {
        const img = fs.readFileSync('../png/' + imgList[1]);
        console.log('Click', 2);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'content-length': img.length
        });
        res.write(img);
        res.end();

        return
    }

    else if (req.url === '/getImg/rescpt3.png' && req.method === 'GET') {
        const img = fs.readFileSync('../png/' + imgList[2]);
        console.log('Click', 3);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'content-length': img.length
        });
        res.write(img);
        res.end();

        return
    }

    else if (req.url === '/getImg/rescpt4.png' && req.method === 'GET') {
        const img = fs.readFileSync('../png/' + imgList[3]);
        console.log('Click', 4);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'content-length': img.length
        });
        res.write(img);
        res.end();

        return
    }

    else if (req.url === '/getImg/rescpt5.png' && req.method === 'GET') {
        const img = fs.readFileSync('../png/' + imgList[4]);
        console.log('Click', 5);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'content-length': img.length
        });
        res.write(img);
        res.end();
        return
    }

    return;

})

server.listen(_PORT, () => console.log('Running at port 3000'));