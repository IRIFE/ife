var createTreeBtn = document.getElementById("createBtn");
var preOrderBtn = document.getElementById("preBtn");
var inOrderBtn = document.getElementById("inBtn");
var postOrderBtn = document.getElementById("postBtn");

var treeHeight = document.getElementById("treeHeight");
treeHeight.value = null;

var treeRoot = document.getElementById("treeRoot");
var biNodeArray;
var timer;

function BiNode(div){
	this.div = div;
	this.leftChild = undefined;
	this.rightChild = undefined;
}

/*
*	建树
*/
var root = new BiNode(treeRoot);
function createTree(){
	treeRoot.innerHTML = "";
	var height = treeHeight.value;
	buildBiTree(root,height);
}
function buildBiTree(biNode,height){
	if(height==0)return;
	height--;
	biNode.leftChild = new BiNode(createDiv(biNode));
	biNode.rightChild = new BiNode(createDiv(biNode));
	buildBiTree(biNode.leftChild,height);
	buildBiTree(biNode.rightChild,height)
}
function createDiv(parentNode){
	var div = document.createElement("div");
	parentNode.div.appendChild(div);
	div.style.width = parentNode.div.clientWidth/2-30+ "px";
	div.style.height = parentNode.div.clientHeight-50+ "px";
	return div;
}

/*
*	遍历结果保存在数组中
*/
function preOrder(biNode){
	if(biNode == undefined)return;
	biNodeArray.push(biNode);
	preOrder(biNode.leftChild);
	preOrder(biNode.rightChild);
}

function inOrder(biNode){
	if(biNode == undefined)return;
	inOrder(biNode.leftChild);
	biNodeArray.push(biNode);
	inOrder(biNode.rightChild);
}

function postOrder(biNode){
	if(biNode == undefined)return;
	postOrder(biNode.leftChild);
	postOrder(biNode.rightChild);
	biNodeArray.push(biNode);
}

/*
*	遍历动画
*/
function startOrder(type){
	clearInterval(timer);
	initRender();

	biNodeArray = [];
	switch(type){
		case "pro": preOrder(root);break;
		case "in": inOrder(root);break;
		case "post": postOrder(root);break;
		default: alert("type is wrong!");return;
	}
	var i = 0;
	timer = setInterval(function(){		
		if(i==biNodeArray.length){
			// initRender();
			biNodeArray[i-1].div.style.backgroundColor = "blue";
			clearInterval(timer);
		}
		initRender();
		render(i);
		i++;
	},500);
}
function initRender(){
	var divs = document.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++)
	{
		divs[i].style.backgroundColor = "#fff";
	}
}
function render(i){
	var currentDiv = biNodeArray[i].div;
	currentDiv.style.backgroundColor = "blue";
}
/*
*	初始化
*/
function init(){
	createTreeBtn.onclick = function(){  createTree();        };
	preOrderBtn.onclick = function()  {  startOrder("pro");   };
	inOrderBtn.onclick = function()   {  startOrder("in");    };
	postOrderBtn.onclick = function() {  startOrder("post");  };

}

init();
