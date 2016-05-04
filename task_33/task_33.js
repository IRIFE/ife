var table = document.getElementById("table");
var x,y;
var pos;
var direction=["Top","Right","Bottom","Left"];
var dir;

function setPostion(m,n){
	var t = table.children[0].children;
	pos = table.children[0].children[n].children[m];
	var div = document.createElement("div");
	div.style.height = 30+"px";
	div.style.width = 30+"px";
	var blue = document.createElement("div");
	var red = document.createElement("div");
	blue.style.backgroundColor = "blue";	
	red.style.backgroundColor = "red";	
	switch(direction[dir]){
		case "Top": 	blue.style.height = 10+"px";
						red.style.height = 20+"px";
						div.appendChild(blue);
						div.appendChild(red);
						break;
		case "Right":   div.style.display = "flex";
						red.style.width = 20+"px";
						blue.style.width = 10+"px";
						div.appendChild(red);
						div.appendChild(blue);					
						break;
		case "Bottom":  red.style.height = 20+"px";
						blue.style.height = 10+"px";
						div.appendChild(red);
						div.appendChild(blue);
						break;
		case "Left":    div.style.display = "flex";
						blue.style.width = 10+"px";
						red.style.width = 20+"px";
						div.appendChild(blue);
						div.appendChild(red);					
						break;
		default: return;
	}
	pos.appendChild(div);
}

function go(){
	switch(direction[dir]){
		case "Top": 	y = y-1;
						if(y>=1){
							pos.innerHTML = "";
							setPostion(x,y);
						}else{
							y = 1;
						}
						break;
		case "Right":   x = x+1;
						if(x<=10){
							pos.innerHTML = "";
							setPostion(x,y);
						}else{
							x = 10;
						}
						break;
		case "Bottom":  y = y+1;
						if(y<=10){
							pos.innerHTML = "";
							setPostion(x,y);
						}else{
							y = 10;
						}
						break;
		case "Left":    x = x-1;
						if(x>=1){
							pos.innerHTML = "";
							setPostion(x,y);
						}else{
							x = 1;
						}
						break;
		default: return;
	}
}
function turn(i){
	switch(direction[dir]){
		case "Top": 	dir = dir+i;
						if(dir==-1){ dir = 3; } 
						if(dir==-2){ dir = 2; } 
						pos.innerHTML = "";
						setPostion(x,y);
						break;		
		case "Right":   dir = dir+i;
						if(dir==-1){ dir = 3; } 
						pos.innerHTML = "";
						setPostion(x,y);
						break;
		case "Bottom":  dir = dir+i;
						if(dir==4){ dir = 0; }
						pos.innerHTML = "";
						setPostion(x,y);
						break;
		case "Left":    dir = dir+i;
						if(dir==4){ dir = 0; }
						if(dir==5){ dir = 1; }
						pos.innerHTML = "";
						setPostion(x,y);
						break;
		default: return;
	}
}

/*
*	初始化
*/
function init(){
	x=5;
	y=5;
	dir = 1;
	setPostion(x,y);
	document.getElementById("do").onclick = function(){		
		var order = document.getElementById("input").value;
		switch(order){
			case "GO": 		go();break;
			case "TUN LEF": turn(-1);break;
			case "TUN RIG": turn(1);break;
			case "TUN BAC": turn(2);break;
			default: alert("Wrong order!");return;
		}
	}
}

init();