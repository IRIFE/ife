function openNew(){
	// 获取页面高度和宽度
			var sHeight = document.documentElement.scrollHeight;
			var sWidth = document.documentElement.scrollWidth;
			// 可视区域的高度和宽度
			//如果说页面是一个竖向的页面，那么可视区域的宽度和页面宽度是一样的
			var  wHeight = document.documentElement.clientHeight;
			
			var oMask = document.createElement("div");
				oMask.id = "mask";
				oMask.style.height = sHeight+"px";
				oMask.style.width = sWidth+"px";
				document.body.appendChild(oMask);

			var oLogin = document.createElement("div");
				oLogin.id = "login";
				oLogin.innerHTML = '用户：<input id="name"></input><br />密码：<input id="password"></input><br />';
				oLogin.innerHTML+='<input id="check" type="button" value="确定"></input><input id="close" type="button" value="取消"></input>';
				document.body.appendChild(oLogin);
			//获取元素高度和宽度
			var dHeight = oLogin.offsetHeight;
			var dWidth = oLogin.offsetWidth;
				oLogin.style.top = (wHeight-dHeight)/2+"px";
				oLogin.style.left = (sWidth-dWidth)/2+"px";

			var oClose = document.getElementById("close");
				//事件可以串起来，实现多个事件同一处理操作。
				oMask.onclick = oClose.onclick = function(){
					document.body.removeChild(oMask);
					document.body.removeChild(oLogin);
				}
			var oCheck = document.getElementById("check");
				oCheck.onclick = function(){
					alert("登录成功！");
					document.body.removeChild(oMask);
					document.body.removeChild(oLogin);
				} 

}


window.onload = function(){
	var oBtn = document.getElementById("loginBtn");
		oBtn.onclick = function(){
			openNew();
		}
}	