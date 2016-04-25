
var boxWrap = document.getElementById("box-wrap");
boxWrap.innerHTML='';

function init(){
	// 为leftin添加事件处理函数
	document.getElementById('leftin').onclick=function(){
		var text = document.getElementById("textInput").value.trim();
		if(!text.match(/^\d+$/))
		{
			alert("请输入数字！");
		}else{
			var div = '<div>'+text+'</div>';
			boxWrap.innerHTML = div + boxWrap.innerHTML;
		}		
	}
	// 为rightin添加事件处理函数
	document.getElementById('rightin').onclick=function(){
		var text = document.getElementById("textInput").value.trim();
		if(!text.match(/^\d+$/))
		{
			alert("请输入数字！");
		}else{
			var div = '<div>'+text+'</div>';
			boxWrap.innerHTML = boxWrap.innerHTML +div;
		}
	}
	// 为leftout添加事件处理函数
	document.getElementById('leftout').onclick=function(){
		boxWrap.removeChild(boxWrap.firstChild);
	}
	// 为rightout添加事件处理函数
	document.getElementById('rightout').onclick=function(){
		boxWrap.removeChild(boxWrap.lastChild);
	}
}

init();