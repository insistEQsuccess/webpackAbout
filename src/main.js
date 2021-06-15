import './style/css.css';
import './style/less.less';
let div = document.createElement('div');
div.className = 'div-box'
div.innerHTML = '<h1>我是H1</h1>';

document.body.appendChild(div)

let yeye = require('./assets/imgs/yeye.png')
let img = document.createElement('img');
img.src = yeye;
img.onload = function (){
    document.appendChild(img)
    console.log(99999999)
}