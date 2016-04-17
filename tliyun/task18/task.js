
// var list=[10,3,7,12,11,30];  //存储所有的值
var list=[];
var show=document.getElementById('display').childNodes;

function getData(){
	//获取输入的数据
	var data=document.getElementById('input').value;
	if(!data.match(/^\d+$/)){
		alert("请输入一个数字！");
	}else{
		return data;
    }
	
}
function renderList(aList){
	//渲染输出当前的所有值
    var display=document.getElementById('display');
    display.innerHTML="";
    var contents=[];
    for(var i=0;i<aList.length;i++){
    	var content="<span class='box'>"+aList[i]+"</span>";
    	contents.push(content);
    }
    for(var j=0;j<contents.length;j++){
    	display.innerHTML+=contents[j];
    }
}

function leftAdd(){
    var input=getData();
    if(input!== undefined){
	    for(var i=list.length;i>0;i--){
	    	list[i]=list[i-1];
        }
	    list[0]=input;
	    renderList(list);
    }
    bindClick(show);
}

function rightAdd(){
    var input=getData();
    if(input!== undefined){
	    list.push(input);
	    renderList(list);
	}
	bindClick(show);
}

function leftDelete(){
    if(list.length>0){
    	alert("删除元素值"+list[0]);
        for(var i=0;i<list.length-1;i++){
            list[i]=list[i+1];
        }
        list.length-=1; 
        renderList(list);
	}
	else{
		alert("元素个数为0！");
	}
}

function rightDelete(){
	if(list.length>0){
		alert("删除元素值"+list[list.length-1]);
        list.length-=1;
        renderList(list);
	}
	else{
		alert("元素个数为0！");
	}
}

function bindClick(show){
 for(var i=0;i<show.length;i++){
        show[i].addEventListener("click",clickDelete);
    }	
}

function clickDelete(){
	// alert("触发删除操作！");
	var del=window.event.target.innerHTML;
    list.remove(del);
	renderList(list);
	bindClick(show);
}

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function init(){
	renderList(list);
	//以下绑定事件，对应四种操作
	document.getElementById('left-in').addEventListener("click",leftAdd);
	document.getElementById('right-in').addEventListener("click",rightAdd);
	document.getElementById('left-out').addEventListener("click",leftDelete);
	document.getElementById('right-out').addEventListener("click",rightDelete);
	//点击某元素，将它删除	
    bindClick(show);
}

init();