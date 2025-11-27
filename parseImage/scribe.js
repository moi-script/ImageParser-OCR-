import scribe from 'scribe.js-ocr';
import fs from 'fs';
// Basic usage
// scribe.extractText(['http://localhost:3000/getImg/top.png'])
// 	.then((res) => console.log(res));


function getFileLength(file) {
	return fs.readdirSync(file);
}

// console.log(getFileLength('../cut'))

export async function getText(file) {
	let body = '', index = 0;
	const fileList = getFileLength(file);

	const task = Array.from({length : fileList.length}, () => scribe.extractText);
	for await (const t of task) {
		const res = await t([`http://localhost:3000/getImg/${fileList[index]}`]);
		body += res;
		index++;
	}
	return body;
}



