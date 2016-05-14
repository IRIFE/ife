var data = [];
data[0]=["小明",80,90,80,250];
data[1]=["小红",90,100,80,270];
data[2]=["小花",70,95,90,255];

var table = document.getElementById("table").children[0];
function render(){	
	for(var i=0; i<data.length; i++){
		var tr = document.createElement("tr");
		for(var j=0; j<data[i].length; j++){
			var td = document.createElement("td");
			td.innerHTML = data[i][j];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

function initChart(){
	for (var i=table.children.length-1; i>0; i--) {
		table.removeChild(table.children[i]);
	}	
}

//选择法排序
function upSort(m){
	for(var i=0; i<data.length; i++){
		for(var j=i; j<data.length-1; j++){
			if(data[j+1][m]<data[i][m]){
				var temp = data[j+1];
				data[j+1] = data[i];
				data[i] = temp;
			}
		}
	}		
}
function downSort(m){
	for(var i=0; i<data.length; i++){
		for(var j=i; j<data.length-1; j++){
			if(data[j+1][m]>data[i][m]){
				var temp = data[j+1];
				data[j+1] = data[i];
				data[i] = temp;
			}
		}
	}	
}

window.onload = function(){	
	render();
	var upSortBtns = document.getElementsByTagName("p");
	for (var i = 0; i < upSortBtns.length; i++) {
		upSortBtns[i].onclick = function(e){
			initChart();
			var num;
			switch(this.parentNode.parentNode.children[0].innerHTML){
				case "语文": num = 1; break;
				case "数学": num = 2; break;
				case "英语": num = 3; break;
				default: num = 4;
			}
			if(this.className == "upSort"){
				upSort(num);
				render();
			}else{
				downSort(num);
				render();
			}
		}		
	}
}
