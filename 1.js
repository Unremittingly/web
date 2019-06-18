async function a() {
    console.log('1');
    await b();
    console.log('2');
    return 9;
}

async function b() {
    console.log('0');
}

a().then(res=>{
    console.log(res);
});

new Promise((resolve, reject) => {
    console.log('4');
    resolve();
})
    .then(() => {
        console.log('5');
    })
    .then(() => {
        console.log('6');
    })
    .then(() => {
        console.log('7');
    });


// console.log('嗄',a());