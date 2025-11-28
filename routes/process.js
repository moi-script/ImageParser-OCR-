import fs from 'fs';
import path from 'path';

// needs to export the file that hanldes the diffreent images 

function imgHandler(req, res){
    const filePath = '../cut/' + path.parse(req.url).base;
    const img = fs.readFileSync(filePath);
    console.log('File path ::', filePath);

    res.writeHead(200, {
        'Content-Type' : 'image/png',
        'content-length' : img.length
    })
    res.write(img);
}

export function routeLoader() {
   const routes = {};
   const fileList = fs.readdirSync('../cut/');

   fileList.forEach(file => {
    routes['/getImg/' + file] = imgHandler
   })

   return routes;

}
