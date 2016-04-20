
var list=[];
var show=document.getElementById('display1').childNodes;
var display1=document.getElementById('display1');

function renderList(aList,display){
	//渲染输出当前的所有值
    display.innerHTML="";
    var contents=[];
    for(var i=0;i<aList.length;i++){
    	var content="<span class='box1'>"+aList[i]+"</span>";
    	contents.push(content);
    }
    for(var j=0;j<contents.length;j++){
    	display.innerHTML+=contents[j];
    }
}

function insertHobby(){
    var data=document.getElementById('input').value;
    var str = data.trim(); 
    var display2=document.getElementById('display2');
        var list2=[];
    var arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);  //分割
    
    var len=arrWord.length;
    for(var i=0;i<len;i++){
        list2.push(arrWord[i].trim());
    }
    var list3=[];
    for(var j=0;j<list2.length;j++){
        if(list3.indexOf(list2[j])===-1 && list2[j]!==""){
            list3.push(list2[j]);
        }
    }
    if(list3.length>10){
        //删除多余10个的前若干元素
        list3.splice(0,list3.length-10);
    }
    renderList(list3,display2);
}

function outStatus(){  //鼠标离开
    var target=window.event.target;
    target.innerHTML=target.innerHTML.split("点击删除")[1];
    target.style.background="#87CEFF";
}

function overStatus(){  //鼠标覆盖
    var target=window.event.target;
    target.innerHTML="点击删除"+target.innerHTML;
    target.style.background="red";
    target.addEventListener("click",clickDelete);
}

function bindClick(show){
 for(var i=0;i<show.length;i++){
        show[i].addEventListener("mouseover",overStatus);
        show[i].addEventListener("mouseout",outStatus);
    }	
}

function clickDelete(){
	// alert("触发删除操作！");
	var del=window.event.target.innerHTML.split("点击删除")[1];
    list.remove(del);
	renderList(list,display1);
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

function insert(str){
    if(str.length>0){
       if(list.length>0 && list.indexOf(str)>-1){
            alert("输入有重复！");
            document.getElementById('tag').value="";
            return;
        }
        else if(list.length<10){
            list.push(str);
        }else{
            list.remove(list[0]);
            list.push(str);
        }
        renderList(list,display1);
        bindClick(show);
        document.getElementById('tag').value="";
    } 
}

function insertData(){
    var data=document.getElementById('tag').value;
    var regex=/，|,|\s|、/;  //逗号，空格
    if(regex.test(data)){  //在被查找的字符串中是否匹配给出的正则表达式
        var match=data.match(regex);
        var str=match.input;
        str=str.substring(0,str.length-1).trim();
        insert(str);       
    }else if(event.keyCode === 13){
         data = data.trim(); 
         if(list.indexOf(data) == -1 && data !== ""){ 
             list.push(data); 
         }else{ 
             alert("输入有重复或者为空字符！"); 
         } 
        document.getElementById('tag').value="";
        renderList(list,display1);
     } 

}

function init(){
	//绑定插入数据事件
    document.getElementById('tag').addEventListener('keyup',insertData);
    //绑定插入爱好事件
    document.getElementById('in-btn').addEventListener('click',insertHobby);
}

init();