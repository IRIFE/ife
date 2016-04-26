var preBtn = document.getElementById("pre");
var postBtn = document.getElementById("post");
var delBtn = document.getElementById("delBtn");
var addBtn = document.getElementById("addBtn");
document.getElementById("input").value = "";
document.getElementById("addValue").value = "";

var searchText;
var timer;
var array = [];
var targetNode;

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
	var divs = document.getElementsByTagName("div");
	for(var i = 0; i<divs.length; i++){
		divs[i].style.backgroundColor = "#fff";
	}
}

function initDivEvent(){
	var divs = document.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++)
	{	
		divs[i].onclick = function(e){
			targetNode = this;
			initRender();
			this.style.backgroundColor = "#CCC";
			e.stopPropagation();//阻止事件冒泡
		}
	}
}

function addBtnHandle(){
	preBtn.onclick = function() { startSearch("pre");  };
	postBtn.onclick = function(){ startSearch("post"); };

	delBtn.onclick = function() {   
		if(targetNode == null){ alert("未选中要删除的节点"); return; }
		targetNode.parentNode.removeChild(targetNode);	
		buildTree();//删除节点后重新建树
    };

	addBtn.onclick = function() {
		var newValue = document.getElementById("addValue").value;
		if (targetNode==null) { alert("没有选中的节点！"); return; }
		if(newValue.trim())
		{
			var div = document.createElement("div");
			var span  = document.createElement("span");
			span.innerHTML = newValue;
			div.appendChild(span);
			div.style.backgroundColor = "#fff";
			targetNode.appendChild(div);
			initDivEvent();//添加节点后为所有div重新添加选中事件
			buildTree();//添加节点后重新建树
		}
	};
}
/*
*	初始化
*/
function init(){
	buildTree();
	initDivEvent();
	addBtnHandle();
}

init();