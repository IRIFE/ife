

function lastSerarch(root){

}

function midSerarch(root){

}

function doSearch(temp){
	console.log(temp.innerHTMl);
    // temp.style.background="red";
    // target.style.background="red";
    // temp.setAttribute("background","red");
}

function preSearch(root){

	doSearch(root);
	while(root.childElementCount>0){
		preSearch(root.firstChild);
		preSearch(root.lastChild);
	}
}

function init(){
	//绑定点击遍历事件
	var root=document.getElementById('root');
	document.getElementById('pre-btn').addEventListener('click',function(){
		preSearch(root);
	});
	// document.getElementById('mid-btn').addEventListener('click',function(){
	// 	midSerarch(root);
	// });
	// document.getElementById('last-btn').addEventListener('click',function(){
	// 	lastSerarch(root);
	// });
}

init();