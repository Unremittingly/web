import { a } from './test.js';

const main = ()=>{
    const element = document.createElement('h1');
    element.innerHTML = `Hello World ${a()}`;

   return  element;
};
export default main;