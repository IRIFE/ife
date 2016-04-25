var boxWrap = document.getElementById("box-wrap");

var text_area = document.getElementById("input");
var search_content = document.getElementById("searh_content");
aqiData = [];

function leftin(){	
	var str = text_area.value.trim();
	// var arrWord = str.split(" ");
	var arrWord = str.split(/[^[0-9A-Za-z\u4E00-\u9FA5]+/);
	aqiData = arrWord.concat(aqiData);
	
	render();
}
function rightin(){	
	var str = text_area.value.trim();
	// var arrWord = str.split(" ");
	var arrWord = str.split(/[^[0-9A-Za-z\u4E00-\u9FA5]+/);
	aqiData = aqiData.concat(arrWord);
	
	render();
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
	render();
	var searchStr = search_content.value.trim();
	for(var i=0; i<aqiData.length; i++){
		var k=0;
		for(var j=0; j<aqiData[i].length; j++){
			if(aqiData[i][j] === searchStr[k]){
				if(aqiData[i].substring(j,j+searchStr.length) === searchStr){
					boxWrap.children[i].style.color = "black";
				}else continue;
			}
		}
	}
	
}

/*
*	渲染
*/
function render(){
	boxWrap.innerHTML='';
	for(var i=0; i<aqiData.length; i++){	
		var str = "<div>"+aqiData[i]+"</div>";

		boxWrap.innerHTML += str;
	}
}
/*
*	为按键添加处理函数
*/
function btnHandle(){
	var left_in = document.getElementById("leftin");
	var right_in = document.getElementById("rightin");
	var left_out = document.getElementById("leftout");
	var right_out = document.getElementById("rightout");
	var search_in = document.getElementById("search");

	left_in.onclick = function()   { leftin();    };
	right_in.onclick = function()  { rightin();   };
	left_out.onclick = function()  { leftout();   };
	right_out.onclick = function() { rightout();  };	
	search_in.onclick = function() { search();    };
}

function initInput(){
	text_area.value = "";
	search_content.value = "";
}
/*
*	初始化
*/
function init(){ 
	initInput();
	btnHandle();
}

init();