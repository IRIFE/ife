var wrap = document.getElementById("wrap");
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

function getAllDiv() {
    return document.getElementsByTagName("div");
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
    treeRoot= createTree(wrap);
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
   treeRoot= createTree(wrap);
}

function TreeNode(div) {
    this.div = div;
    this.childTreeNode = [];
}

function createTree(div) {
    var treeNode = new TreeNode(div);
    treeNode.childTreeNode = getChildNodes(div);
    return treeNode;
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
            childTreeNode.push(createTree(nodes[i]));
        }
    }
    return childTreeNode;
}

function startVisit(type) {
    query = document.getElementById("query").value;
    //解决在动画未完成时的冲突
    clearInterval(timer);
    initRender();
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
    var allDiv = getAllDiv();
    var i = 0,
        len = allDiv.length;
    for (; i < len; i++)
        allDiv[i].style.backgroundColor = "white";
    wrap.innerHTML.toString().replace('id="highLight"',"");
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
        content = content.substring(0, index) + "<span id='highLight'>" + query + "</span>" + highLight(FollowContent, query);
    }
    return content;
}

function bind() {
    proVisitBtn.addEventListener("click", function(e) { startVisit("pro"); });
    posVisitBtn.addEventListener("click", function(e) { startVisit("pos"); });
    deleteBtn.addEventListener("click", deleteDiv);
    addBtn.addEventListener("click", addDiv);
    var alldiv = getAllDiv();
    var i = 0,
        len = alldiv.length;
    for (; i < len; i++)
        alldiv[i].addEventListener("click", function(e) {
            showDiv(e);
        });
}

function init() {
    treeRoot=createTree(wrap);
    bind();
}
init();
