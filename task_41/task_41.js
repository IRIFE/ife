var today = new Date();
var year;
var month;
var date;
var daysOfMonth;//当月天数
var mm;//本月第一天是星期几
// alert(first.getFullYear()+"年"+first.getMonth()+"月"+first.getDate()+"日,星期"+mm)
var showBtn = document.getElementById("showBtn");
var calender = document.getElementById("calender");
var title = document.getElementById("title");
var box = document.getElementById("days-box");

window.onload = function(){
	year = today.getFullYear();
	month = today.getMonth();
	date = today.getDate();	
	// alert(year+"年"+(month+1)+"月"+date+"日")
	showBtn.value = year+"年"+(month+1)+"月"+date+"日";
	
	showBtn.onclick = function(){
		if(calender.className == "hidden"){
			calender.className = "";
			renderTitle();
			renderBox();
			addHandle();
		}else{
			calender.className = "hidden";
		}
	}
}

function renderTitle(){
	// 渲染周六日字体颜色	
	var lists = document.getElementsByTagName("li");
	for(var i=0; i<lists.length; i++){
		if(i%7==0 || i%7==6){
			lists[i].style.color = "#CD0000";
		}
	}	
}
function renderBox(){
	//renderTitle
	title.innerHTML = year+"年"+(month+1)+"月";
	
	var first = new Date();
	first.setFullYear(year,month,1);//本月第一天

	daysOfMonth = DayNumOfMonth(year,month+1);//计算当年当月天数
	// alert(daysOfMonth);

	//renderBox
	mm = first.getDay();//本月第一天是星期几
	
	if(mm==0){ mm=7; }
	for(var i=mm; i>0; i--){
		var li = document.createElement("li");	
		var daysOfPreMonth;
		if(month==0)
		{
			daysOfPreMonth = DayNumOfMonth(year-1,12);
		}else{
			daysOfPreMonth = DayNumOfMonth(year,month);
		}
		li.innerHTML = daysOfPreMonth+1-i;
		li.style.color = "#ccc";
		box.appendChild(li);
	}
	for(var j=0; j<daysOfMonth; j++){
		var li = document.createElement("li");
		li.innerHTML = j+1;	
		//渲染周六日的日期
		if((mm+j)%7==0 || (mm+j)%7==6){
			li.style.color = "#CD0000";
		}
		box.appendChild(li);
	}
	var z=1;
	for(var i=0; i<(42-mm-daysOfMonth); i++){
		var li = document.createElement("li");	
		li.innerHTML = z++;
		li.style.color = "#ccc";
		box.appendChild(li);
	}
}
function addHandle(){
	var lists = box.getElementsByTagName("li");
	for(var i = mm; i<(mm+daysOfMonth); i++){
		lists[i].onclick = function(e){
			// alert(this.innerHTML)
			var on = document.getElementById("on");
			if(on!=null){
				on.id = "";
				on.style.backgroundColor = "#fff";
				if((parseInt(on.innerHTML)+parseInt(mm)-1)%7==0 || (parseInt(on.innerHTML)+parseInt(mm)-1)%7==6){
					on.style.color = "#CD0000";
				}else{
					on.style.color = "black";
				}
			}		
			this.id = "on";
			this.style.backgroundColor = "#CD0000";
			this.style.color = "#fff";
			var timer = setTimeout(function(){
				showBtn.value = title.innerHTML+document.getElementById("on").innerHTML+"日";
				calender.className = "hidden";
				box.innerHTML = "";
			},500);
		}
	}

	document.getElementById("pre").onclick = function(){  
		var lists = box.getElementsByTagName("li");
		for(var i=0; i<lists.length; i++){
			if(lists[i].style.backgroundColor == "#CD0000"){
				date = lists[i].innerHTML;
			}
		}

		box.innerHTML ="";
		month--;
		if(month==-1){
			year--;
			month=11;
		};
		// alert(year+"年"+(month+1)+"月"+date+"日")
		today.setFullYear(year,month,date);
		renderBox();
		addHandle();
	};
	document.getElementById("post").onclick = function(){  
		var lists = box.getElementsByTagName("li");
		for(var i=0; i<lists.length; i++){
			if(lists[i].style.backgroundColor == "#CD0000"){
				date = lists[i].innerHTML;
			}
		}

		box.innerHTML ="";
		month++;
		if(month==12){
			year++;
			month=0;
		};
		// alert(year+"年"+(month+1)+"月"+date+"日")
		today.setFullYear(year,month,date);
		renderBox();
		addHandle();
	};
}

function DayNumOfMonth(year,month){
	var days;
	if(month == 2){//当月份为二月时，根据闰年还是非闰年判断天数
        days= year % 4 == 0 ? 29 : 28;
        
    }
    else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days= 31;
    }
    else{
        //其他月份，天数为：30.
        days= 30;      
    }
    return days;
}