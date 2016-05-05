var table=document.getElementById("table");
var head=document.getElementById("head");

function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}else{
		ele["on"+type]=handler;
	}
}

function fixedHead(){
	//window.scrollY是当前窗口在Y轴上滑动的距离
   if(window.scrollY-table.offsetTop>0 && window.scrollY-table.offsetTop<table.offsetHeight){
    	head.style.position="fixed";
    	head.style.top=0;
    }else{
    	head.style.position="static";
    }
}

function init(){
    addEvent(window,"scroll",fixedHead);
}

init();