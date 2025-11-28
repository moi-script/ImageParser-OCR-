import { createWorker } from 'tesseract.js';
import scribe from 'scribe.js-ocr';



export async function getTextByScribe() {
    const res = await scribe.extractText(['http://localhost:3000/getImg/waltermart.png']);
    return res;
}

export  async function getTextByTesseract() {
    const worker = await createWorker('eng');
    const ret = await worker.recognize('http://localhost:3000/getImg/waltermart.png');
    await worker.terminate();

    return ret.data.text;
}