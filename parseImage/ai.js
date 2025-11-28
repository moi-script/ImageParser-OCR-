import { OpenRouter } from "@openrouter/sdk";
// import scribe from "scribe.js-ocr";
import { getTextByScribe, getTextByTesseract } from "./tess.js";


const input1 =await getTextByScribe();
const input2 = await getTextByTesseract();

console.log('Input 1 -> ', input1);
console.log('Input 2 -> ', input2);


const prompts = 'Complete the incomplete between these two result in a single final output convert into json' + ' input1 ->' + input1 + ' input 2 -> ' + input2;
async function readTextAi(prompts) {

    const openrouter = new OpenRouter({
        apiKey: "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"
    });
    const stream = await openrouter.chat.send({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
            {
                "role": "user",
                "content": prompts
            }
        ],
        stream: true
    });
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            process.stdout.write(content);
        }
    }
}

await readTextAi(prompts);
