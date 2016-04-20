
function prompt(length){
    if(length<4 || length>16){
    	document.getElementById('hint').innerHTML="长度不符合条件";
    	document.getElementById('hint').style.color="red";
    }else{
    	document.getElementById('hint').innerHTML="输入合适正确";
    	document.getElementById('hint').style.color="green";
    }
}

function test() 
{ 
	var data=document.getElementById('input').value;
	var length = 0;  
	for (var i=0; i<data.length; i++) 
	{
	   var c = data.charCodeAt(i);  
	   //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
	   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
	   	//前者为0-128
	      length++;  
       }else{
       	  length+=2;
       } 
    }
    prompt(length);
}

function init(){
	//绑定点击验证事件
	document.getElementById('test').addEventListener('click',test);
}

init();