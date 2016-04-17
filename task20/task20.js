var textBox = document.getElementById("textBox");
var nodeArray = new Array();
var wrap = document.getElementById('member_wrap');

function leftin() {
    var newNodes = createMembs(getValue());
    var newNode;
    if (wrap.childNodes.length == 0) {
        for (var i = 0, len = newNodes.length; i < len; i++) {
            newNode = newNodes[i]
            wrap.appendChild(newNode);
            nodeArray.unshift(newNode);
        }
        // nodeArray.unshift(newNodes);
        console.log(nodeArray.length);
        return;
    }
    for (i = newNodes.length - 1; i >= 0; i--) {
        newNode = newNodes[i];
        var node = wrap.firstChild;
        wrap.insertBefore(newNode, node);
        nodeArray.unshift(newNode);
    }
    // nodeArray.unshift(newNodes);
    console.log(nodeArray.length);
}

function rightin() {
    var newNode;
    var newNodes = createMembs(getValue());
    for (var i = 0, len = newNodes.length; i < len; i++) {
        newNode = newNodes[i];
        wrap.appendChild(newNode);
        nodeArray.push(newNode);
    }
    // nodeArray.push(newNodes);
    console.log(nodeArray.length);
}

function leftout() {
    if (wrap.childNodes.length == 0) {
        alert("there is no member yet!");
        return;
    }
    var node = wrap.firstChild;
    wrap.removeChild(node);
    nodeArray.shift();
}

function rightout() {
    if (wrap.childNodes.length == 0) {
        alert("there is no member yet!");
        return;
    }
    var node = wrap.lastChild;
    wrap.removeChild(node);
    nodeArray.pop();
}

function getValue() {
    var value=textBox.value;
    if(value=="")
        return;
    var strArray = value.split(/[^[0-9A-Za-z\u4E00-\u9FA5]+/);
    return strArray;
}
//删除节点
function remove(node) {
    wrap.removeChild(node);
    delete nodeArray[node];
}

function createMembs(strArray) {
    var newNodes = new Array();
    for (var i = 0, len = strArray.length; i < len; i++) {
        if (strArray[i] == "") {
            return newNodes;
        }
        var newNode = document.createElement("div");
        newNode.className = "block";
        newNode.innerHTML = strArray[i];
        newNode.addEventListener("click", function(e) {
            remove(e.target);
        })
        newNodes.push(newNode);
    }
    return newNodes;
}
// 查询方法
function search() {
    var query = document.getElementById('query').value.toString();
    for (var i = 0, len = nodeArray.length; i < len; i++) {
        var content = nodeArray[i].innerHTML.toString();
        nodeArray[i].innerHTML = highLight(content, query);
    }
}
// 给查询添加特殊样式
function highLight(content, query) {
    var index = content.indexOf(query);
    if (index != -1) {
        var FollowContent = content.substring(index + query.length);
        content = content.substring(0, index) + "<span>" + query + "</span>" + highLight(FollowContent, query);
    }
    return content;
}

function init() {
    document.getElementById('leftin').addEventListener("click", leftin);
    document.getElementById('rightin').addEventListener("click", rightin);
    document.getElementById('leftout').addEventListener("click", leftout);
    document.getElementById('rightout').addEventListener("click", rightout);
    document.getElementById('search').addEventListener("click", search)
}
init();
