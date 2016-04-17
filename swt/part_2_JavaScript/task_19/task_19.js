
/*
*	数据存储
*/
var aqiData = [];

/*
*	读取表单，并验证
*/
function getInput(){
	var inputValue = document.getElementById('textInput').value.trim();
	if(!inputValue.match(/^(([123456789]\d)(\.\d+)?|100)$/))
	{
		alert("请输入10~100的数！");
		return false;
	}
	if(aqiData.length >= 60){
		alert("超过输入限制（60个）！");
		return false;
	} 
	return inputValue;
}

/*
*	左侧入
*/
function leftin(){
	var inputValue = getInput();
	if(inputValue === false) return;
	aqiData.unshift(inputValue);
	renderChart();
}
/*
*	右侧入
*/
function rightin(){
	var inputValue = getInput();
	if(inputValue === false) return;
	aqiData.push(inputValue);

	renderChart();
}
/*
*	左侧出
*/
function leftout(){
	if(aqiData.length === 0){
		alert("已无数据！");
		return false;
	}
	aqiData.shift();
	// alert("删除‘"+aqiData.shift()+"’!");

	renderChart();
}
/*
*	右侧出
*/
function rightout(){
	if(aqiData.length === 0){
		alert("已无数据！");
		return false;
	}
	aqiData.pop();
	// alert("删除‘"+aqiData.pop()+"’!");

	renderChart();
}
/*
*	初始化复制给aqitData
*/
function initData(number){
	aqiData = [];
	for(var i=0; i<number; i++){
		aqiData.push(Math.floor(Math.random()*90+10));
	}
	renderChart();
}

/*
*	冒泡排序(小->大)
*/

// var flag = 0;
// function sortAqiData() {
// 	for(var i=aqiData.length-1; i>=0;i--){
// 	 	for(j=0; j<i; j++)
// 	 	{			
//  			if(flag === 0 && aqiData[j] < aqiData[j+1]){
// 	 			var temp = aqiData[j];
// 	 			aqiData[j] = aqiData[j+1];
// 	 			aqiData[j+1] = temp; 
// 	 		}
// 	 		if(flag === 1 && aqiData[j] > aqiData[j+1]){
// 	 			var temp = aqiData[j];
// 	 			aqiData[j] = aqiData[j+1];
// 	 			aqiData[j+1] = temp; 
// 	 		}
// 			renderChart();
// 	 	} 		
// 	}
// 	if(flag === 0){ 
// 		flag = 1;
// 	}else{ flag = 0;  }
// }
var flag = 0;
function sortAqiData() {
	var sel = document.getElementById('ms');
	var index = sel.selectedIndex;
	var textsel = sel.options[index].text;

	var i = aqiData.length -1;
	var t;
	sortAqiData.moveOne = function(){
	    for(j=0; j<i; j++)
	 	{			
 			if(flag === 0 && aqiData[j] < aqiData[j+1]){
	 			var temp = aqiData[j];
	 			aqiData[j] = aqiData[j+1];
	 			aqiData[j+1] = temp; 
	 		}
	 		if(flag === 1 && aqiData[j] > aqiData[j+1]){
	 			var temp = aqiData[j];
	 			aqiData[j] = aqiData[j+1];
	 			aqiData[j+1] = temp; 
	 		}
			renderChart();
	 	} 		
	    i--;
	    if(i<0) {
	    	clearInterval(t);
	    }    
 	}
	if(flag === 0){
		flag = 1;
	} else {
		flag = 0;
	}
	t = setInterval("sortAqiData.moveOne()",textsel);
}


var colors = ["#f81d49", "#538289", "#a02730", "#73832a", "#005db1", "#10193a","#543687","#283w67","#dfssfs"];
//根据值的大小选择颜色
function getColor(value){
	if(value<=20) { return colors[0]; }
	if(value<=30) { return colors[1]; }
	if(value<=40) { return colors[2]; }
	if(value<=50) { return colors[3]; }
	if(value<=60) { return colors[4]; }
	if(value<=70) { return colors[5]; }
	if(value<=80) { return colors[6]; }
	if(value<=90) { return colors[7]; }
	if(value<=100){ return colors[8]; }
}
/*
*	渲染图表
*/
function renderChart(){
	var chart = document.getElementById('box-wrap');
	chart.innerHTML = '';
	for(var i=0; i<aqiData.length; i++){	
		var div = document.createElement('div');
		div.style.height = aqiData[i]*3+"px";
		div.style.background = getColor(aqiData[i]);
		chart.appendChild(div);
	}
}

/*
*	绑定按键事件
*/
function initBtnEvent(){
	var left_in = document.getElementById("leftin");
	var right_in = document.getElementById("rightin");
	var left_out = document.getElementById("leftout");
	var right_out = document.getElementById("rightout");
	var innit_data = document.getElementById("initdata");
	var sort_data = document.getElementById("sortdata");
	
	left_in.onclick = function()   { leftin();     };
	right_in.onclick = function()  { rightin();    }; 
	left_out.onclick = function()  { leftout();    };
	right_out.onclick = function() { rightout();   };
	innit_data.onclick = function(){ initData(40); }; 
	sort_data.onclick = function() { sortAqiData();   };
}

/*
*	初始化
*/
function init(){
	initData(40);
	initBtnEvent();
}

init();