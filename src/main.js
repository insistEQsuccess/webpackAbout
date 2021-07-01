import './style/css.css';
import './style/less.less';
import './style/icon.css'

document.title = '哈哈'
// import yeye from './assets/imgs/yeye.png'
let yeye = require('./assets/imgs/yeye.png')
let img = document.createElement('img');
img.src = yeye.default;
img.title = 'I am a picture'
let app = document.querySelector('.app');
app.append(img)
class poper{
    constructor() {
        this.title = '我是弹出的信息';
    }
    static alt = '我是alt'
    popMsg(){
        return '确定弹出 静态属性值吗？'
    }
    printMsg(){
        alert(poper.alt)
    }
}
let p = new poper();
if(window.confirm(p.popMsg())){
    p.printMsg()
}
function f1(){
    return Promise.resolve('this f1 result')
}
function f2(){
    return Promise.resolve('this f2 result')
}
async function foo(){
    console.log('foo start excutes')
    let r1 = await f1()
    let r2 = await f2();
    console.log(r1, r2)
}
foo();


