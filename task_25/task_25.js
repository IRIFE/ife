var input = document.getElementById("searchInput");
input.value = "";
var preBtn = document.getElementById("preBtn");
var postBtn = document.getElementById("postBtn");

var timer;
var array = [];
var targetNode;
var root = new treeNode(document.getElementById("root"));


function treeNode(li) {
	this.li = li;
	this.childs = [];	
}
/*
*	建树
*/
function createTreeNode(tNode){
	if(tNode.li.children.length == 2)
	{
		var ul = document.createElement("ul");
		tNode.li.appendChild(ul);
	}

	var ul = tNode.li.children[2];
	var j =0;
	for(var i =0; i<ul.children.length; i++)
	{
		tNode.childs[j] = new treeNode(ul.children[i]);
		createTreeNode(tNode.childs[j]);
		j++;
	}
}
function buildTree(){
	createTreeNode(root);
}

/*
*	遍历查询
*/
function preOrder(parent){
	array.push(parent);
	for (var i = 0; i < parent.childs.length; i++) {
		preOrder(parent.childs[i]);
	}
}
function postOrder(parent){
	for (var i = 0; i < parent.childs.length; i++) {
		postOrder(parent.childs[i]);
	}
	array.push(parent);
}

function search(type){
	clearInterval(timer);
	clearHideLi();
	initRender();
	initFontColor();

	searchText = input.value;
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

		var thiscontent = array[i].li.innerHTML.split("<")[0].trim();
		if(thiscontent == searchText){
			array[i].li.style.color = "red";
			
			if ( array[i].li.children.length!= 0) {
				var ul = array[i].li.children[2];				
			 	for(var j=0; j<ul.children.length; j++)
				{
			 		ul.children[j].style.color = "black";
			 	}
			}		 
		}

		i++;
		if(i==array.length){
			array[i].li.style.backgroundColor = "blue"; 
			initRender();
			clearInterval(timer);
		}
	},500);
}
function clearHideLi(){
	var hides = document.getElementsByClassName("hide");
	for(var i=0; i<hides.length; i++){
		hides[i].className = "";
	}
	var a = document.getElementsByTagName("a");
	for (var i = 0; i < a.length; i++) {
		a[i].className = "hide";
	}
}
function render(i){
	
	array[i].li.style.backgroundColor = "blue"; 
}
function initRender(){
	var lis = document.getElementsByTagName("li");
	for(var i = 0; i<lis.length; i++){
		lis[i].style.backgroundColor = "#fff";
	}
}
function initFontColor(){
	var lis = document.getElementsByTagName("li");
	for(var i = 0; i<lis.length; i++){
		lis[i].style.color = "black";
	}
}
/*
*	为控件添加响应函数
*/
function initHandle(){
	preBtn.onclick = function(){  search("pre");  };
	postBtn.onclick = function(){  search("post"); };

	var lists = document.getElementsByTagName("li");
	for(var i=0; i<lists.length; i++)
	{	
		lists[i].onclick = function(e){
			var ul;
			ul = this.children[2];
			if(ul.className=="")
			{
				ul.className = "hide";
			}
			else 
			{
				ul.className = "";
			}
			e.stopPropagation();//阻止事件冒泡
		}
	
		lists[i].onmouseover=function(e){
			initRender();
			if(this.style.color != "red")
			{	
				this.style.color = "blue";
			}
			if ( this.children.length!= 2) {
				var ul = this.children[2];	
			 	for(var j=0; j<ul.children.length; j++)
				{
					if(ul.children[j].style.color!="red"){	
			 			ul.children[j].style.color = "black";
					}
			 	}
			}
			
			var a = this.getElementsByTagName("a");
			for(var k=0; k<2; k++){
				a[k].className = "";
			}

			e.stopPropagation();//阻止事件冒泡
		}
		lists[i].onmouseout=function(e){
			initRender();
			if(this.style.color != "red")
			{	
				this.style.color = "black";
			}
			var a = this.getElementsByTagName("a");
			for(var j=0; j<a.length; j++){
				a[j].className = "hide";
			}
			e.stopPropagation();//阻止事件冒泡
		}
	}

	var addAs = document.getElementsByClassName("add");
	for (var i = 0; i < addAs.length; i++) {
		addAs[i].onclick = function(e){
			targetNode = this;
			var addValue = prompt("请输入添加的内容：","");
			if(addValue ==null || addValue == ""){return;}
			else{
				var li = document.createElement("li");
				li.innerHTML =  addValue + '<a href="javascript:;" class="add hide">	+</a><a href="javascript:;" class="del hide">	-</a>';
				var ul = targetNode.parentNode.children[2];
				if(ul.className=="")
				{
					ul.className = "hide";
				}
				else 
				{
					ul.className = "";
				}
				ul.appendChild(li);
				initHandle();
				buildTree();
			}
		}
	}

	var delAs = document.getElementsByClassName("del");
	for (var i = 0; i < delAs.length; i++) {
		delAs[i].onclick = function(e){
			targetNode = this;
			targetNode.parentNode.parentNode.removeChild(targetNode.parentNode);	
			buildTree();//删除节点后重新建树
		}
	}
}

/*
*	初始化
*/
function init(){
	buildTree();
	initHandle();
}

init();