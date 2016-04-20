
var list=[];
var show=document.getElementById('display').childNodes;

function getData(){
    var data=document.getElementById('input').value;  //输入的文本
    var str = data.trim(); 
    var arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);  //分割
    var len=arrWord.length;
    for(var i=0;i<len;i++){
        list.push(arrWord[i]);
    }
    renderList(list); 
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

function rightAdd(){
    var input=getData();
    if(input!== undefined){
	    list.push(input);
	    renderList(list);
	}
	bindClick(show);
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

function doReplace(temp,search){
    var index=temp.indexOf(search);
    if(index>-1){
        var remain=temp.substring(index+search.length); 
        temp=temp.substring(0,index)+"<span style='color:blue'><b>"+search+"</b></span>"+doReplace(remain,search);
    }
    return temp;      
}

function search(){
    var search=document.getElementById('search').value;  //输入的搜索词
    for (var i = 0; i <list.length; i++) {
        list[i]=doReplace(list[i],search);
    }
    renderList(list);
}

function init(){
	renderList(list);
    //绑定添加元素的事件
	document.getElementById('right-in').addEventListener("click",rightAdd);
	//点击某元素，将它删除	
    bindClick(show);
    //绑定搜索事件
    document.getElementById('search-btn').addEventListener("click",search);
}

init();