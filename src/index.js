import React, {Component} from 'react';
import ReactDom from 'react-dom';

let root = document.getElementById('root');
class MyComp extends Component {
  render(){
    return <div>我是react渲染的元素</div>
  }
}
$('.app').html('<h1>我是通过jquery插入的h1</h1>')
ReactDom.render(
  // <MyComp/>,
  <div>我是react渲染的元素</div>,
  root
)