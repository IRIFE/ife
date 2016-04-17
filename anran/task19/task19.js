/*对象集合*/
var nodeArray = new Array();
var wrap = document.getElementById('member_wrap');

function leftin() {
    var newNode = createMemb(getValue());
    if (wrap.childNodes.length == 1) {
        wrap.appendChild(newNode);
        return;
    }
    var node = wrap.firstChild;
    nodeArray.unshift(newNode);
    wrap.insertBefore(newNode, node);
}
function rightin() {
    var newNode = createMemb(getValue());
    wrap.appendChild(newNode);
    nodeArray.push(newNode);
}
function leftout() {
    if (wrap.childNodes.length == 1) {
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
//获取输入框内 的数字
function getValue() {
    var value = document.getElementById("textBox").value;
    if (!value.match(/^[1-9][0-9]*$/)) {
        alert("wrong input");
        return;
    }
    return parseInt(value);
}
//删除节点
function remove(node) {
    wrap.removeChild(node);
    delete nodeArray[node];
}
// 添加一个div条
function createMemb(value) {
    /*creat a new  element*/
    var newMemb = document.createElement("div");
    newMemb.className = "bar";
    newMemb.setAttribute("title", value);
    /*set bar height*/
    var containorHeight = wrap.offsetHeight;
    var containorWidth = wrap.offsetWidth;
    // var barWidth = newMemb.style.width;
    // if (nodeArray.length * barWidth >= containorWidth) {
    //     newMemb.style.width = containorWidth / nodeArray + "px";
    // }
    var barHeight = parseInt(value) / 100 * (0.7 * containorHeight);
    newMemb.style.height = barHeight + "px";

    /*add click remove event*/
    newMemb.addEventListener("click", function(e) {
        remove(e.target);
    })
    return newMemb;
}
// 随机生成数据
function randomBuildData() {
    var num = parseInt(document.getElementById('dataAmount').value);
    if ((nodeArray.length + num) > 60) {
        alert("最多只允许60个输入！请重新输入");
        return;
    }
    for (var i = 0; i < num; i++) {
        var value = Math.floor(Math.random() * 90) + 10;
        var newMemb = createMemb(value);
        wrap.appendChild(newMemb);
        nodeArray.push(newMemb);
    }
}
// 排序动画
function orderChar() {
    var node1, node2;
    var timer1;
    i = nodeArray.length - 1;

    timer1 = setInterval(function() {
        if (i == 0) {
            nodeArray[i].style.backgroundColor = "red";
            self.clearTimeout(timer1);
            return;
        }
        for (var j = 0; j < i; j++) {
            node1 = nodeArray[j];
            node2 = nodeArray[j + 1];
            num1 = parseInt(nodeArray[j].offsetHeight);
            num2 = parseInt(nodeArray[j + 1].offsetHeight);
            if (num1 > num2) {

                node1.style.backgroundColor = "black";
                node2.style.backgroundColor = "red";
                var tempHeight = node1.offsetHeight;
                var tempTitle = node1.getAttribute("title");
                node1.style.height = node2.offsetHeight + "px";
                node1.setAttribute("title", node2.getAttribute('title'));
                node2.style.height = tempHeight + "px";
                node2.setAttribute("title", tempTitle);
            }
        }
        nodeArray[i].style.backgroundColor = "red";
        i--;
    }, 200);

}
//重置
function reset() {
    nodeArray = new Array();
    wrap.innerHTML = "";
}
function init() {
    document.getElementById('leftin').addEventListener("click", leftin);
    document.getElementById('rightin').addEventListener("click", rightin);
    document.getElementById('leftout').addEventListener("click", leftout);
    document.getElementById('rightout').addEventListener("click", rightout);
    document.getElementById('randomInit').addEventListener("click", randomBuildData);
    document.getElementById('order').addEventListener("click", orderChar);
    document.getElementById('reset').addEventListener("click", reset)
}
init();
