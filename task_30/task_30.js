var lists = document.getElementsByTagName("input");
var check = [];
for (var i = 0; i < lists.length-1; i++) {
	lists[i].value = "";
	check[i] = 0;
}
var hints = document.getElementsByClassName("hint");

function addHandle(){	
	for(var i=0; i<lists.length-1; i++)
	{
		lists[i].onfocus = function(e){
			this.style.borderColor = "#ccc";
			var hint = this.parentNode.parentNode.children[2];
			switch(this.id){
				case "name": 		hint.innerHTML = "必填，长度为4~16个字符";
							 		hint.style.color = "#ccc";
							 		break;
				case "password": 	hint.innerHTML = "必填，以字母开头，长度在6~20之间,只能包括字符、数字和下划线";
							 		hint.style.color = "#ccc";
							 		break;
				case "re_password": hint.innerHTML = "再次输入相同密码";
							 		hint.style.color = "#ccc";
							 		break;
				case "email": 		hint.innerHTML = "必填";
							 		hint.style.color = "#ccc";
							 		break;
				default: 			hint.innerHTML = "必填";
							 		hint.style.color = "#ccc";												 
			}
			hint.className="hint";//表单获得焦点时，hint不隐藏
			e.stopPropagation();//阻止冒泡事件
		}
		switch(i){//表单失去焦点时进行验证
			case 0: lists[i].onblur = function(){ testName(0); };
					break;
			case 1: lists[i].onblur = function(){ testPassword(1); };
					break;
			case 2: lists[i].onblur = function(){ re_testPassword(2); };
					break;
			case 3: lists[i].onblur = function(){ testEmail(3); };
					break;
			default: lists[i].onblur = function(){ testPhoneNum(4); };
		}
	}

	document.getElementById("submit").onclick = function(){ submit(); };

}

function testName(k){
	var length = 0;
	var name = document.getElementById("name").value.trim();

	for(var i=0; i<name.length; i++){
		var c = name.charCodeAt(i);  
		if(c>255)
	    {		   	
	   		length+=2;  
        }else{
       	   length++;
       	}
	}
	if(length==0){
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "名称不能为空";
		hints[k].style.color = "red";
	}
	else if(length<4 || length>16){
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "长度不符合条件";
		hints[k].style.color = "red";
	}
	else{
		lists[k].style.borderColor = "green";
		hints[k].innerHTML = "名称格式正确";
		hints[k].style.color = "green";
		check[k] = 1;		
	}
}
function testPassword(k){
	var password = document.getElementById("password").value.trim();
	if(password.length == 0){
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "密码不能为空";
		hints[k].style.color = "red";
	}
	else if(password.match(/^[a-zA-Z]\w{5,19}$/)){		
		lists[k].style.borderColor = "green";
		hints[k].innerHTML = "密码可用";
		hints[k].style.color = "green";
		check[k] = 1;
	}
	else{
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "密码不符合条件";
		hints[k].style.color = "red";
	}
}
function re_testPassword(k){
	var re_password = document.getElementById("re_password").value.trim();
	var password = document.getElementById("password").value.trim();
	if(re_password == password){
		lists[k].style.borderColor = "green";
		hints[k].innerHTML = "密码输入一致";
		hints[k].style.color = "green";
		check[k] = 1;
	}
	else{
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "密码输入不一致";
		hints[k].style.color = "red";
	}
}
function testEmail(k){
	var email = document.getElementById("email").value.trim();
	if(email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
		lists[k].style.borderColor = "green";
		hints[k].innerHTML = "邮箱格式正确";
		hints[k].style.color = "green";
		check[k] = 1;
	}else{
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "邮箱格式错误";
		hints[k].style.color = "red";
	}
}
function testPhoneNum(k){
	var phoneNum = document.getElementById("phoneNum").value.trim();
	if(phoneNum.match(/^\d{11}$/)){
		//11位数字
		lists[k].style.borderColor = "green";
		hints[k].innerHTML = "手机格式正确";
		hints[k].style.color = "green";
		check[k] = 1;
	}else{
		lists[k].style.borderColor = "red";
		hints[k].innerHTML = "手机格式错误";
		hints[k].style.color = "red"
	}
}
function submit(){
	var result = 1;
	for(var i=0; i<check.length; i++){
		if(check[i]==0){
			result = 0;
			break;
		}
	}
	if(result == 0){
		alert("输入有误！");
	}else{
		alert("提交成功");
	}
}

/*
*	初始化
*/
function init() {	
	addHandle();
}

init();