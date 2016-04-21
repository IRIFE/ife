var wrap = document.getElementById("wrap");
var btn = document.getElementById("input");
var proVisitBtn = document.getElementById("proVisit");
var midVisitBtn = document.getElementById("midVisit");
var posVisitBtn = document.getElementById("posVisit");
var biTreeRoot;
var biNodeArray = [];
var timer;

function BiNode(div) {
    this.div = div;
    this.leftChild = undefined;
    this.rightChild = undefined;
};

function createBiTree(biNode, depth) {
    if (depth == 0) {
        return;
    }
    depth--;
    biNode.leftChild = new BiNode(createDiv(biNode));
    biNode.rightChild = new BiNode(createDiv(biNode));
    createBiTree(biNode.leftChild, depth);
    createBiTree(biNode.rightChild, depth);
}

function createDiv(parentNode) {
    var div = document.createElement("div");
    parentNode.div.appendChild(div);
    div.style.width = (2 * parentNode.div.clientWidth / 5) + "px";
    div.style.height = (3 * parentNode.div.clientHeight / 5) + "px";
    return div;
}

function startVisit(type) {
    //解决在动画未完成时的冲突
    clearInterval(timer);
    initRender();
    
    biNodeArray = [];
    switch (type) {
        case "pro":
            proVisit(biTreeRoot);
            break;
        case "mid":
            midVisit(biTreeRoot);
            break;
        case "pos":
            postVisit(biTreeRoot);
            break;
        default:
           alert("type is wrong");
           return;
    }
    var i = 0,
        len = biNodeArray.length;
    timer= setInterval(function() {
        if (i == len) {
            biNodeArray[i - 1].div.style.backgroundColor = "white";
            clearInterval(timer);
        }
        render(i);
        i++;
    }, 500);
}

function proVisit(biNode) {
    if (biNode == undefined)
        return;
    biNodeArray.push(biNode);
    proVisit(biNode.leftChild);
    proVisit(biNode.rightChild);
}

function midVisit(biNode) {
    if (biNode == undefined)
        return;

    midVisit(biNode.leftChild);
    biNodeArray.push(biNode);
    midVisit(biNode.rightChild);
}

function postVisit(biNode) {
    if (biNode == undefined)
        return;

    postVisit(biNode.leftChild);
    postVisit(biNode.rightChild);
    biNodeArray.push(biNode);
}

function initRender(){
    var allDiv=document.getElementsByTagName("div");
    var i=0,len=allDiv.length;
    for(;i<len;i++)
    allDiv[i].style.backgroundColor="white";
}

function render(i) {
    var currentDiv = biNodeArray[i].div;
    currentDiv.style.backgroundColor = "blue";
    if (i > 0) {
        var lastDiv = biNodeArray[i - 1].div;
        lastDiv.style.backgroundColor = "white";
    }
}

function initVisit() {
    proVisitBtn.addEventListener("click", function(e) { startVisit("pro"); });
    midVisitBtn.addEventListener("click", function(e) { startVisit("mid"); });
    posVisitBtn.addEventListener("click", function(e) { startVisit("pos"); });

}

function buildTree() {
    wrap.innerHTML = "";
    biTreeRoot= new BiNode(wrap);
    depth = document.getElementById("depth").value;
    createBiTree(biTreeRoot, depth);
    initVisit();
}

function init() {
    btn.addEventListener("click", buildTree);
}
init();
