// "use strict";
// (function() {
var tag = document.getElementById("tag");
var hobby = document.getElementById("hobby");
var tagInput = document.getElementById("tag_box");
var hobbyInput = document.getElementById("hobby_box");
var tagBtn = document.getElementById("tag_input");
var hobbyBtn = document.getElementById("hobby_input");
var tagWrap = new Wrap();
var hobbyWrap = new Wrap();

function Wrap() {
    var wrap = document.createElement("div");
    var me = this;
    me.wrap = wrap;
    me.wrap.className = "wrap";
    me.getWrap = function() {
        return me.wrap;
    };
    me.getChildrenNodes = function() {
        return me.wrap.getElementsByTagName("div");
    };
    me.getNodesNum = function() {
        return me.getChildrenNodes().length; //调用为 getNodesNum();
    };
    me.deleteNode = function(node) {
        me.wrap.removeChild(node);
    };
    me.exist = function(value) {
        var nodes = me.getChildrenNodes();
        var i = 0,
            len = nodes.length;
        for (; i < len; i++) {
            if (nodes[i].innerHTML == value)
                return true;
        }
        return false;
    };
    me.createNode = function(value) {
        if (me.exist(value)) {
            return;
        }
        var newNode = document.createElement("div");
        newNode.innerHTML = value;
        me.wrap.appendChild(newNode);
        newNode.className = "block";
        if (me.getNodesNum() > 10) {
            me.deleteNode(me.wrap.firstChild);
        }
        newNode.addEventListener("click", function(e) { me.deleteNode(e.target); });
        newNode.addEventListener("mouseover", function(e) { showDeletInfo(e.target); });
        newNode.addEventListener("mouseout", function(e) { back(e.target); });
    };

    function showDeletInfo(target) {
        var value = target.innerHTML;
        target.innerHTML = "点击删除" + value;
    }

    function back(target) {
        var value = target.innerHTML.replace("点击删除", "");
        target.innerHTML = value;
    }
};

var checkKey = function(e) {
    e = e || event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 100 || keyCode == 32 || keyCode == 13 || keyCode == 188) //数字键盘回车，空格，回车，逗号
    {
        tagInputOver();
    }
};

var tagInputOver = function() {
    var value = tagInput.value.replace(/[^[0-9A-Za-z\u4E00-\u9FA5]+/, "");
    tagInput.value = "";
    if (value == "")
        return;
    tagWrap.createNode(value);
};

var hobbyInputOver = function() {
    var value = hobbyInput.value;
    hobbyInput.value = "";
    if (value == "")
        return;
    var valueArray = value.split(/[^[0-9A-Za-z\u4E00-\u9FA5]+/);
    var i = 0,
        len = valueArray.length;
    for (; i < len; i++) {
        var item = valueArray[i];
        if (item.toString() != "")
            hobbyWrap.createNode(item);
    }
};

function init() {
    tag.appendChild(tagWrap.wrap);
    hobby.appendChild(hobbyWrap.getWrap());
    tagInput.addEventListener("keyup", function(e) {
        checkKey(e);
    });
    tagBtn.addEventListener("click", tagInputOver);
    hobbyBtn.addEventListener("click", hobbyInputOver);
}
// window.onload = function() { init() };
window.onload = init();
// })(window, document);
