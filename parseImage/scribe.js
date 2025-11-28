import scribe from 'scribe.js-ocr';
import fs from 'fs';
import path from 'path';
import { getFileList } from './util.js';

// Basic usage
// scribe.extractText(['http://localhost:3000/getImg/top.png'])
// 	.then((res) => console.log(res));


// console.log(getFileLength('../cut'))

export async function getText(file) {
	let body = '', index = 0;
	const fileList = getFileList(file);

	const task = Array.from({ length: fileList.length }, () => scribe.extractText);
	for await (const t of task) {
		const res = await t([`http://localhost:3000/getImg/${fileList[index]}`]);

		console.log('Response --> ', res);
		body += res;
		index++;
	}
	console.log('Body --> ', body);
	return body;
}


function searchFiles(source, target) { // we can use the value of original file list before cut

	const originalFiles = getFileList(source);
	const splittedFile = getFileList(target);

	const fileMap = new Map();

	originalFiles.forEach((item, i) => {
		const pattern = new RegExp(path.parse(item).name, 'g');
		fileMap.set(i, splittedFile.filter(files => files.match(pattern)));
	})
	return fileMap;
}


// getText('../cut');


