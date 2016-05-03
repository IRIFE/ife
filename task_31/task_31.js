function cityChange(){
	var data = {
		北京: ["北京大学","北京航空航天大学","北京交通大学","北京理工大学","清华大学"],
		辽宁: ["大连理工大学","大连海事大学","东北大学","东北财经大学","沈阳工业大学"],
		上海: ["复旦大学","上海交通大学","同济大学"]
	};
	var city = document.getElementById("city").value;
	var target = document.getElementById("university");
	target.innerHTML = "";
	for(var i=0; i<data[city].length; i++){
		target.innerHTML += "<option>"+data[city][i]+"</option>";
	}
}

function selectIdentify(){
	var student = document.getElementById("student");
	var notstudent = document.getElementById("notstudent");
	if(student.checked){
		document.getElementById("for_student").className = "";
		document.getElementById("for_notstudent").className = "hide";
	}
	if(notstudent.checked){
		document.getElementById("for_notstudent").className = "";
		document.getElementById("for_student").className = "hide";
	}
}

/*
*	初始化
*/
function init(){
	document.getElementById("student").checked = true;
	document.getElementById("city").children[0].selected = true;
	document.getElementById("selectIdentify").onchange = function(){ selectIdentify(); };
	document.getElementById("city").onchange = function(){ cityChange(); };
}

init();