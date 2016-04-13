
var boxWrap = document.getElementById("box-wrap");
aqiData = [];

function leftin(){

}

function rightin(){

}

function leftout(){
	if(aqiData.length === 0){
		alert("已无数据！");
	}
	aqiData.shift();

	render();
}

function rightout(){
	if(aqiData.length === 0){
		alert("已无数据！");
	}
	aqiData.pop();

	render();
}

function search(){


}

/*
*	为按键添加处理函数
*/
function btnHandle(){
	var left_in = document.getElementById("leftin");
	var right_in = document.getElementById("rightin");
	var left_out = document.getElementById("leftout");
	var right_in = document.getElementById("rightin");
	var search_in = document.getElementById("search");

	left_in.onclick = function()  { leftin()   };
	right_in.onclick = function() { rightin()  };
	left_out.onclick = function() { leftout()  };
	right_out.onclick = function(){ rightout() };
	search_in.onclick = function(){ search()   };
}

/*
*	渲染图表
*/
function render(){
	for(var i=0; i<aqiData.length; i++){
		var div = document.createElement('div');
		boxWrap.appendChild(div);
	}
}

/*
*	初始化
*/
function init(){
	btnHandle();
	render();
	}
}

init();