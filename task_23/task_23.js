var preBtn = document.getElementById("pre");
var postBtn = document.getElementById("post");
document.getElementById("input").value = "";

var searchText;
var timer;
var array = [];

function treeNode(div){
	this.div = div;
	this.chilNode = [];
}

var root = new treeNode(document.getElementById("treeBox"));
function buildTree(){	
	createTreeNode(root);
}
function createTreeNode(tNode){
	var j =0;
	for(var i =1; i<tNode.div.children.length; i++)
	{
		tNode.chilNode[j] = new treeNode(tNode.div.children[i]);
		createTreeNode(tNode.chilNode[j]);
		j++;
	}
}

/*
*	遍历
*/
function preOrder(parent){
	array.push(parent);
	for (var i = 0; i < parent.chilNode.length; i++) {
		preOrder(parent.chilNode[i]);
	}
}
function postOrder(parent){
	for (var i = 0; i < parent.chilNode.length; i++) {
		postOrder(parent.chilNode[i]);
	}
	array.push(parent);
}

/*
*	查询动画
*/
function startSearch(type){
	clearInterval(timer);
	initRender();

	var spans = document.getElementsByTagName("span");
	for(var j=0; j<spans.length; j++){
		spans[j].style.color = "black";
	}// 清除上次的查询结果
	
	searchText = document.getElementById("input").value;
	var i = 0;
	array = [];

	switch(type){
		case "pre": preOrder(root);break;
		case "post": postOrder(root);break;
		default: alert("type is wrong");return;
	}
	timer = setInterval(function(){
		initRender();
		render(i);

		var index = array[i].div.children[0].innerHTML.indexOf(searchText);
		var content = array[i].div.children[0].innerHTML;
		if(index != -1){
			array[i].div.children[0].innerHTML = content.substring(0,index)+"<span class='highLight'>"+searchText+"</span>"+content.substring(index+searchText.length,content.length);
		}//查询结果的效果显示

		i++;
		if(i==array.length){
			array[i].div.style.backgroundColor = "blue"; 
			initRender();
			clearInterval(timer);
		}
	},500);
}
function render(i){
	array[i].div.style.backgroundColor = "blue"; 
}
function initRender(){
	for(var i = 0; i<array.length; i++){
		array[i].div.style.backgroundColor = "#fff";
	}
}

/*
*	初始化
*/
function init(){
	buildTree();

	preBtn.onclick = function() { startSearch("pre");  };
	postBtn.onclick = function(){ startSearch("post"); };
}

init();