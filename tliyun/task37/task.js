var panel=document.getElementById('panel');
var mask=document.getElementById('mask');

//自动居中
window.onload=function(){
  //winW，winH表示网页可见区域宽和高
  showPanel();
  var winW=document.documentElement.clientWidth || document.body.clientWidth;
  var winH=document.documentElement.clientHeight || document.body.clientHeight;
  panel.style.left=(winW-panel.offsetWidth)/2+"px";
  panel.style.top=(winH-panel.offsetHeight)/2+"px";
};

//考虑浏览器的兼容性,添加事件
var eventUtil={
  addHandler:function(ele,type,handle){
  	if(ele.addEventListener){
  		ele.addEventListener(type,handle,false);
  	}else if(ele.attachEvent){
        ele.attachEvent('on'+type,handle);
  	}else{
  		ele['on'+type]=handle;
  	}
  }
};

function fnDown(event){
  event=event || window.event;
  panel.style.cursor="move";
  //获取鼠标相对于面板左侧和上侧的距离，其中clientX和clientY是鼠标指针的 x 和 y 坐标
  var disX=event.clientX-panel.offsetLeft;
  var disY=event.clientY-panel.offsetTop;
  document.onmousemove=function(event){
  	event=event || window.event;
  	fnMove(event,disX,disY);
  };
  //释放鼠标
  document.onmouseup=function(event){
  	panel.style.cursor="auto";
  	document.onmousemove=null;
  	document.onmouseup=null;
  };
}

//移动面板
function fnMove(e,posX,posY){
  var l=e.clientX-posX;
  var t=e.clientY-posY;
  //winW，winH表示网页可见区域宽和高
  var winW=document.documentElement.clientWidth || document.body.clientWidth;
  var winH=document.documentElement.clientHeight || document.body.clientHeight;
  var maxW=winW-panel.offsetWidth;
  var maxH=winH-panel.offsetHeight;
  //判断边界
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=0;
  }else if(t>maxH){
    t=maxH;
  }
  panel.style.left=l+'px';
  panel.style.top=t+'px';

}

function showPanel(){
  panel.style.display="block";
  mask.style.display="block";
}

function login(){
  alert("登录成功！");
  panel.style.display="none";
  mask.style.display="none";
}

function hidePanel(){
  panel.style.display="none";
  mask.style.display="none";
}

function init(){
  var btn=document.getElementById("login-btn");
  var btn1=document.getElementById("btn1");
  var btn2=document.getElementById("btn2");
  eventUtil.addHandler(btn,"click",showPanel);
  eventUtil.addHandler(btn1,"click",login);
  eventUtil.addHandler(btn2,"click",hidePanel);
  eventUtil.addHandler(panel,'mousedown',fnDown);
  eventUtil.addHandler(mask,"click",hidePanel);
}

init();
