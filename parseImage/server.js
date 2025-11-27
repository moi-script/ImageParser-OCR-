
import http from 'http';
import { createReadStream } from 'fs';
import fs from 'fs';
import { splitImage } from './split.js';
// let data = [];

// img.on('data', ch => {
//     data.push(ch);
// })


// function getBuf() {
//     return new Promise((acc) => {
//         img.on('end', () => {
//             const bufs = Buffer.concat(data);
//             acc(bufs);
//         })

//     })
// }



// img.on('error', ch => {
//     console.error(ch);
// })

const imgList = ['pCopy1.png', 'pCopy2.png', 'rescpt3.png', 'rescpt4.png', 'rescpt5.png'];

const server = http.createServer((req, res) => {

    //hanlde preflight

    if(req.url === '/upload' && req.method === 'POST') {
        // process the request;
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



server.listen(3000, () => console.log('Running at port 3000'));