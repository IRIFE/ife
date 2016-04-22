function cityChange(){
	var data = {
        北京: ["北京大学", "清华大学", "北京航空航天大学"],
        上海: ["复旦大学", "上海交通大学", "同济大学"],
        天津: ["天津大学", "南开大学"]
    };
    var source = document.getElementById("city-select");
    var target = document.getElementById("college-select");
    var selected = source.options[source.selectedIndex].value;  //selectedIndex为当前选中值得索引值
    target.innerHTML = "";
    var content="";
    for (var i = 0; i < data[selected].length; i++) {  
		content+="<option>"+data[selected][i]+"</option>";
    }
    document.getElementById('college-select').innerHTML=content;  //插入数据
}

function radioChange(){
    if (document.getElementById("student").checked) {
        document.querySelector("#college-list").setAttribute("style","display:block;");
        document.querySelector("#company-list").setAttribute("style","display:none;");
    }
    else {
        document.querySelector("#college-list").setAttribute("style","display:none;");
        document.querySelector("#company-list").setAttribute("style","display:block;");
    }
}

function init(){
	document.getElementById('select').addEventListener('change',radioChange);
	document.getElementById('city-select').addEventListener('change',cityChange);
}

init();