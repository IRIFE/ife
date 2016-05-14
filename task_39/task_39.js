var table = document.querySelector('table');
var thead = document.querySelector('thead'); 

window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop;
	if(table.offsetTop <= scrollTop){
		thead.style.position = "fixed";
		thead.style.top = '0';
		if(table.offsetTop+table.offsetHeight <= scrollTop){
			thead.style.position = "static";
		}
	}else{
		thead.style.position = "static";
	}
}