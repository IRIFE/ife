var wrap = document.getElementById('member_wrap');
wrap.style.margin="10px";
function leftin() {
    var newNode = addMemb();
    if (wrap.childNodes.length == 1) {
        wrap.appendChild(newNode);
        return;
    }
    var node = wrap.firstChild;
    wrap.insertBefore(newNode, node);
}

function rightin() {
    var newNode = addMemb();
    wrap.appendChild(newNode);
}

function leftout() {
    if (wrap.childNodes.length == 0) {
        alert("there is no member yet!");
        return;
    }
    var node = wrap.firstChild;
    wrap.removeChild(node);
}

function rightout() {
    if (wrap.childNodes.length == 1) {
        alert("there is no member yet!");
        return;
    }
    var node = wrap.lastChild;
    wrap.removeChild(node);
}

function addMemb() {
    var textBox = document.getElementById("textBox");
    var value = textBox.value;
    if(!value.match(/^[1-9][0-9]*$/)){
    	alert("wrong input");
    	return;
    }
    var newMemb = document.createElement("span");
    newMemb.innerHTML=value;
    newMemb.style.backgroundColor = "red";
    newMemb.style.color = "white";
    newMemb.style.margin="5px";
    newMemb.style.padding="5px";
    newMemb.addEventListener("click",function(e){
    	wrap.removeChild(e.target);
    })
    return newMemb;
}

function init() {
    document.getElementById('leftin').addEventListener("click", leftin);
    document.getElementById('rightin').addEventListener("click", rightin);
    document.getElementById('leftout').addEventListener("click", leftout);
    document.getElementById('rightout').addEventListener("click", rightout);
}
init();
