var input = document.getElementById("input");
var testBtn = document.getElementById("testBtn");
var hint = document.getElementById("hint");

function init(){
	testBtn.onclick = function(){
		var name = input.value.trim();
		var length = 0;
		//判断是否为汉字有两种方法：
		//1.用 Unicode 字符范围判断
				// 在 Unicode 字符中，汉字的编码都是大于255
		for(var i=0; i<name.length; i++){
			var c = name.charCodeAt(i);  
			if(c>255)
		    {		   	
		   		length+=2;  
	        }else{
	       	   length++;
	       	}
		}
		//2.正则式判断
			//var str;
			// if(/^[\u4e00-\u9fa5]+$/.test(str)){
			// 	alert("是汉字")
			// }

		if(length==0){
			input.style.borderColor = "red";
			hint.innerHTML = "名称不能为空";
			hint.style.color = "red";
		}
		if(length<4 || length>16){
			input.style.borderColor = "red";
			hint.innerHTML = "长度不符合条件";
			hint.style.color = "red";
		}
		else{
			input.style.borderColor = "green";
			hint.innerHTML = "名称格式正确";
			hint.style.color = "green";
		}
	}
}

init();
