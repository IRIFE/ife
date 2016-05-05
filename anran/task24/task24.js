var wrap = document.getElementById("wrap");
var oriWrap=wrap.innerHTML;
var proVisitBtn = document.getElementById("proVisit");
var posVisitBtn = document.getElementById("posVisit");
var queryBtn = document.getElementById("queryBtn");
var deleteBtn = document.getElementById("deleteBtn");
var addBtn = document.getElementById("addBtn");

var treeRoot;
var nodeArray = [];
var timer;
var query;
var target;

function getAll(tagName) {
    return document.getElementsByTagName(tagName);
}


function showDiv(e) {
    target = e.target;
    initRender();
    if (target.nodeName.toLowerCase() == "span")
        target = target.parentNode;
    target.style.backgroundColor = "gray";
}

function deleteDiv() {
    if (target == undefined) {
        alert("还没有选定窗口");
        return;
    }
    target.parentNode.removeChild(target);
    treeBuilder(wrap);
}

function addDiv() {
    if (target == undefined) {
        alert("还没有选定窗口");
        return;
    }
    var value = document.getElementById("newValue").value;
    var newDiv = document.createElement("div");
    newDiv.innerHTML = "<span>" + value + "</span>";
    target.appendChild(newDiv);
    treeBuilder(wrap);
}

function TreeNode(div) {
    this.div = div;
    this.childTreeNode = [];
}

function createTree(treeNode) {
    treeNode.childTreeNode = getChildNodes(treeNode.div);
}

function getChildNodes(div) {
    if (!div.hasChildNodes())
        return [];
    var childTreeNode = [];
    var nodes = div.childNodes;
    var i = 0,
        len = nodes.length;
    for (; i < len; i++) {
        if (nodes[i].nodeName.toLowerCase() == "div") {
            var newTreeNode = new TreeNode(nodes[i]);
            createTree(newTreeNode);
            childTreeNode.push(newTreeNode);
        }
    }
    return childTreeNode;
}
function treeBuilder(){
    treeRoot=new TreeNode(wrap);
    createTree(treeRoot);
}
function startVisit(type) {
    query = document.getElementById("query").value;
    if (query == "") {
        alert("请输入查询");
        return;
    }
    //解决在动画未完成时的冲突
    clearInterval(timer);
    initRender();
    treeBuilder();
    nodeArray = [];
    switch (type) {
        case "pro":
            proVisit(treeRoot);
            break;
        case "pos":
            postVisit(treeRoot);
            break;
    }
    var i = 0,
        len = nodeArray.length;
    timer = setInterval(function() {
        if (i == len) {
            nodeArray[i - 1].div.style.backgroundColor = "white";
            clearInterval(timer);
            return;
        }
        render(i);
        i++;
    }, 200);
}

function proVisit(node) {

    nodeArray.push(node);
    if (node.childTreeNode == undefined)
        return;
    var i = 0,
        len = node.childTreeNode.length;
    for (; i < len; i++) {
        proVisit(node.childTreeNode[i]);
    }
}

function postVisit(node) {
    if (node.childTreeNode == undefined)
        return;
    var i = 0,
        len = node.childTreeNode.length;
    for (; i < len; i++) {
        postVisit(node.childTreeNode[i]);
    }
    nodeArray.push(node);
}

function initRender() {
    var allDiv = getAll("div");
    var i = 0,
        len = allDiv.length;
    for (; i < len; i++)
        allDiv[i].style.backgroundColor = "white";

    var allSpan=getAll("span");
    var j=0,
    len0=allSpan.length;
    for(;j<len0;j++){
        if(allSpan[j].className=="highLight"){
            var content=allSpan[j].textContent;
            newNode=document.createTextNode(content);
            allSpan[j].parentNode.replaceChild(newNode,allSpan[j]);
            j--;
            len0--;
        }
    }
    
}

function render(i) {
    var currentDiv = nodeArray[i].div;
    currentDiv.style.backgroundColor = "blue";
    var currentSpan = currentDiv.getElementsByTagName("span")[0];
    var text = currentSpan.textContent.trim();
    if (query != undefined) {
        // currentDiv.firstChild=document.createElement("span");
        currentSpan.innerHTML = highLight(text, query);
    }
    if (i > 0) {
        var lastDiv = nodeArray[i - 1].div;
        lastDiv.style.backgroundColor = "white";
    }
}
// 给查询添加特殊样式
function highLight(content, query) {
    var index = content.indexOf(query);
    if (index != -1) {
        var FollowContent = content.substring(index + query.length);
        content = content.substring(0, index) + "<span class='highLight'>" + query + "</span>" + highLight(FollowContent, query);
    }
    return content;
}

function bind() {
    proVisitBtn.addEventListener("click", function(e) { startVisit("pro"); });
    posVisitBtn.addEventListener("click", function(e) { startVisit("pos"); });
    deleteBtn.addEventListener("click", deleteDiv);
    addBtn.addEventListener("click", addDiv);
    var alldiv = getAll("div");
    var i = 0,
        len = alldiv.length;
    for (; i < len; i++)
        alldiv[i].addEventListener("click", function(e) {
            showDiv(e);
        });
}

function init() {
    // treeRoot = createTree(wrap);
    bind();
}
init();
