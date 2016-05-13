var container = document.getElementById("container");
var x,y;
var box;

var dir;
var timer;
var a;
var angle=0;
var flag = 0;

function mov(direction){
	if(direction == dir){
		tra(direction);
	}else{
		switch(direction){
			case "Top": 	switch(dir){
								case "Bottom": a = 180/30;break;
								case "Right": a = -90/30;break;
								case "Left": a = 90/30;break;
								default: ;
							}
							if(y>=30){
								var i=0;
								clearInterval(timer);
								timer = setInterval(function(){
									i++;
									y--;
									angle += a;
									setBox(x,y);
									box.style.transform="rotate("+angle+"deg)";	
									if (i>=30) {
										clearInterval(timer);
										flag = 0;
									}
								},10);	
								dir = direction;	
							}else{
								flag = 0;
							}
							break;
			case "Right":   switch(dir){
								case "Bottom": a = -90/30;break;
								case "Top": a = 90/30;break;
								case "Left": a = 180/30;break;
								default: ;
							}
							if(x<=240){
								var i=0;
								clearInterval(timer);
								timer = setInterval(function(){
									i++;
									x++;
									angle += a;
									setBox(x,y);
									box.style.transform="rotate("+angle+"deg)";	
									if (i>=30) {
										clearInterval(timer);
										flag = 0;	
									}
								},10);	
								dir = direction;	
								
							}else{
								flag = 0;
							}			
							break;
			case "Bottom":  switch(dir){
								case "Top": a = 180/30;break;
								case "Right": a = 90/30;break;
								case "Left": a = -90/30;break;
								default: ;
							}
							if(y<=240){
								var i=0;
								clearInterval(timer);
								timer = setInterval(function(){
									i++;
									y++;
									angle += a;
									setBox(x,y);
									box.style.transform="rotate("+angle+"deg)";	
									if (i>=30) {
										clearInterval(timer);
										flag = 0;
									}
								},10);	
								dir = direction;
							}else{
								flag = 0;
							}
							break;
			case "Left":    switch(dir){
								case "Bottom": a = 90/30;break;
								case "Right": a = 180/30;break;
								case "Top": a = -90/30;break;
								default: ;
							}
							if(x>=30){
								var i=0;
								clearInterval(timer);
								timer = setInterval(function(){
									i++;
									x--;
									angle += a;
									setBox(x,y);
									box.style.transform="rotate("+angle+"deg)";	
									if (i>=30) {
										clearInterval(timer);
										flag = 0;
									}
								},10);	
								dir = direction;
							}else{
								flag = 0;
							}				
							break;
			default: return;
		}
	}
	
}


function tra(direction){
	switch(direction){
		case "Top": 	if(y>=30){
							var i=0;							
							var h=y;
							y=y-30;
							clearInterval(timer);
							timer = setInterval(function(){
								i++;
								h--;
								setBox(x,h);
								if (i>=30) {
									clearInterval(timer);
									flag = 0;
								}
							},10);
						}else{
								flag = 0;
							}
						break;
		case "Right":   if(x<=240){
							var i=0;
							clearInterval(timer);
							timer = setInterval(function(){
								i++;
								x++;
								setBox(x,y);
								if (i>=30) {
									clearInterval(timer);
									flag = 0;
								}
							},10);
						}else{
								flag = 0;
							}				
						break;
		case "Bottom":  if(y<=240){
							var i=0;
							clearInterval(timer);
							timer = setInterval(function(){
								i++;
								y++;
								setBox(x,y);
								if (i>=30) {
									clearInterval(timer);
									flag = 0;
								}
							},10);
						}else{
								flag = 0;
							}
						break;
		case "Left":    if(x>=30){
							var i=0;
							clearInterval(timer);
							timer = setInterval(function(){
								i++;
								x--;
								setBox(x,y);
								if (i>=30) {
									clearInterval(timer);
									flag = 0;	
								}
							},10);
						}else{
								flag = 0;
							}			
						break;
		default: return;
	}
}

function setBox(m,n){
	box.style.position = "absolute";
	box.style.top = n + "px";
	box.style.left = m + "px";
}

function createBox(direction){
	box = document.createElement("div");
	box.style.height = 30+"px";
	box.style.width = 30+"px";
	var blue = document.createElement("div");
	var red = document.createElement("div");
	blue.style.backgroundColor = "blue";	
	red.style.backgroundColor = "red";	
	switch(direction){
		case "Top": 	blue.style.height = 10+"px";
						red.style.height = 20+"px";
						box.appendChild(blue);
						box.appendChild(red);
						break;
		case "Right":   box.style.display = "flex";
						red.style.width = 20+"px";
						blue.style.width = 10+"px";
						box.appendChild(red);
						box.appendChild(blue);					
						break;
		case "Bottom":  red.style.height = 20+"px";
						blue.style.height = 10+"px";
						box.appendChild(red);
						box.appendChild(blue);
						break;
		case "Left":    box.style.display = "flex";
						blue.style.width = 10+"px";
						red.style.width = 20+"px";
						box.appendChild(blue);
						box.appendChild(red);					
						break;
		default: return;
	}
	container.appendChild(box);
}
/*
*	初始化
*/
function init(){
	dir = "Top";
	createBox(dir);
	x = 120;
	y = 120;
	setBox(x,y);


	document.getElementById("do").onclick = function(){		
		var order = document.getElementById("input").value.toUpperCase();
		if(flag == 0){
			flag = 1;
			switch(order){
				case "TRA LEF": tra("Left");							
								break;
				case "TRA TOP": tra("Top");
								break;
				case "TRA RIG": tra("Right");
								break;
				case "TRA BOT": tra("Bottom");
								break;
				case "MOV LEF": mov("Left");
								break;
				case "MOV TOP": mov("Top");
								break;			
				case "MOV RIG": mov("Right");
								break;			
				case "MOV BOT": mov("Bottom");
								break;			
				default: alert("Wrong order!");return;
			}
		}		
	}
}

init();