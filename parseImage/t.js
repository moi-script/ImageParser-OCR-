

function delay() {
    return new Promise((acc, rej) => setTimeout(() => acc('Done'), 3000));
}

const task = [delay, delay];



// let i =0;
// while(i < 2)  {
//     console.log(task[i]);
//     task[i]().then(val => console.log(val)).catch(err => console.error(err));
//     i++;
// }


for await(const d of task){
    const val = await d();
    console.log(val);
}