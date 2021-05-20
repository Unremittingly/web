
// async function a() {
//     console.log('1');
//     await b();
//     console.log('2');
//     return 9;
// }
//
// async function b() {
//     console.log('0');
// }
//
// a().then(res=>{
//     console.log(res);
// });
//
// new Promise((resolve, reject) => {
//     console.log('4');
//     resolve();
// })
//     .then(() => {
//         console.log('5');
//     })
//     .then(() => {
//         console.log('6');
//     })
//     .then(() => {
//         console.log('7');
//     });

// console.log('334');


const funcP = async ()=>{
}

const  p1 =  new Promise(resolve => {
    const a =b;
    resolve(a);
}).catch(()=>{
    return Promise.resolve('aaab')
});
const  p2 =  new Promise(resolve => {
    const a =1;
    return resolve(a);
}).catch(()=>{
    return Promise.resolve('aaa')
});


Promise.all([p1,p2]).then((data)=>{
    console.log('then 成功',data);
}).catch((err)=>{
    console.log('333');
    console.log('errr',err);
})

// console.log('嗄',a());