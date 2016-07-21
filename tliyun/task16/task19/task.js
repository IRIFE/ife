
// var list=[10,3,7,12,11,30];  //存储所有的值
var list=[];
var show=document.getElementById('display').childNodes;

function generate(){
    //随机生成50个数据
    for(var i=0;i<50;i++){
        var num=Math.floor(10+Math.random()*90);
        list[i]=num;
    }
    renderList(list);
    bindClick(show);
}

function getData(){
	//获取输入的数据
	var data=document.getElementById('input').value;
	if(!data.match(/^\d+$/)){
		alert("请输入一个数字！");
	}else{
        if(data< 10|| data>100){
            alert("输入的数字必须在10-100之间！");
        }
        else return data;
    }
}

var display=document.getElementById('display');
function renderList(aList){
	//渲染输出当前的所有值
    display.innerHTML="";
    for(var i=0;i<aList.length;i++){
        var columella=document.createElement("div");
        display.appendChild(columella);
        columella.className="bar";
        var height=aList[i]; 
        columella.setAttribute("title",height);
      
        var containerWidth = display.offsetWidth;   //offsetWidth是对象的可见宽度，会随窗口的显示大小改变
        var containerHeight = display.offsetHeight; 
        columella.style.width = containerWidth / aList.length +"px"; 
        columella.style.height = height*5+"px";

        switch(true){
          case height<20:
            columella.style.backgroundColor="green";
            break;
          case height<40:
            columella.style.backgroundColor="blue";
            break;
          case height<60:
            columella.style.backgroundColor="grey";
            break;
          case height<80:
            columella.style.backgroundColor="red";
            break;
          default:
            columella.style.backgroundColor="black";
        }
    }
}

function leftAdd(){
    var input=getData();
    if(input!== undefined && input>=10 && input<=100){
        if(list.length>=60){
            alert("最多60个数据！");
        }else{
            for(var i=list.length;i>0;i--){
                list[i]=list[i-1];
            }
            list[0]=input;
            renderList(list);
        }
	    
    }
    bindClick(show);
}

function rightAdd(){
    var input=getData();
    if(input!== undefined && input>=10 && input<=100){
        if(list.length>=60){
            alert("最多60个数据！");
        }else{
	    list.push(input);
	    renderList(list);
        }
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
    //为每个元素绑定点击可以删除的事件
 for(var i=0;i<show.length;i++){
        show[i].addEventListener("click",clickDelete);
    }	
}

function clickDelete(){
	// alert("触发删除操作！");
	var del=window.event.target.getAttribute('title');  //获取title
    list.remove(del);  //删除数据
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

function bubbleSort(){  //冒泡排序
    var i=list.length-1;
    var counter=0; //计数
    var j=0;

    var timer = setInterval(function(){

        if(i===0 && counter===list.length-1){
            self.clearTimeout(timer);  //停止
            return;
        }
        if (i === 0){
            i=list.length-1;
            counter++;
            j=0; 
        }
                   
        var temp="";
        var isExchanged=false;  //判断是否发生了交换
        if(list[j]>list[j+1]){
            temp=list[j];
            list[j]=list[j+1];
            list[j+1]=temp;
            isExchanged=true;                
        }
        i--;
        j++;
        
        if(isExchanged===true){
            renderList(list);
        }

    },2);
    bindClick(show); 
}

function init(){
    document.getElementById('random').addEventListener("click",generate);
    renderList(list);  //渲染输出元素
	//以下绑定事件，对应四种操作
	document.getElementById('left-in').addEventListener("click",leftAdd);
	document.getElementById('right-in').addEventListener("click",rightAdd);
	document.getElementById('left-out').addEventListener("click",leftDelete);
	document.getElementById('right-out').addEventListener("click",rightDelete);	
    bindClick(show);  //点击某元素，将它删除
    document.getElementById('sort').addEventListener("click",bubbleSort);
}

init();