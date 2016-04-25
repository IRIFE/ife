var tag = document.getElementById("tag");
var tagDiv = document.getElementById("tagChart");
var hobby = document.getElementById("hobby");
var hobbyDiv = document.getElementById("hobbyChart");
var hobby_btn = document.getElementById("hobby_btn");

tag.value = "";
hobby.value = "";
tagData = [];
hobbyData = [];

function showTagDiv(event){
	// var e = event || window.event || arguments.callee.caller.arguments[0];
	var keyCode = event.keyCode;
	if (keyCode == 32 || keyCode == 188 ||keyCode == 13) //对应空格，逗号，回车
	{
		var str = tag.value.replace(/[^[0-9A-Za-z\u4E00-\u9FA5]+/g, "");
		if(str)
		{
			tagData.push(str);
			check(tagData);
		}
		renderTagChart();
		tag.value = "";
	}
}
function renderTagChart(){
	tagDiv.innerHTML="";
	for(var i=0; i<tagData.length; i++)
	{
		var div = document.createElement("div");
		div.innerHTML = tagData[i];
		tagDiv.appendChild(div);
	}
}


function check(array){
	var str = array[array.length-1];
	for(var i=0; i<array.length-1; i++)
	{
		if (str==array[i]) 
		{
			alert("重复输入");
			array.pop();
			break;
		}
	}
	while(array.length>10){
		array.shift();
	}
}

function showHobbyDiv(){
	var str = hobby.value.trim();
	var hobbyData = str.split(/[^[0-9A-Za-z\u4E00-\u9FA5]+/);
	check(hobbyData);

	hobbyDiv.innerHTML="";
	for(var i=0; i<hobbyData.length; i++)
	{
		if(hobbyData[i])
		{
			var div = document.createElement("div");
			div.innerHTML = hobbyData[i];
			hobbyDiv.appendChild(div);
		}
	}
}

/*
*	初始化
*/
function init(){
	tag.onkeyup=function(event){ showTagDiv(event); };

	hobby_btn.onclick = function(){ showHobbyDiv(); };
}

init();