var calendar=document.getElementById("day");
var monthValue=document.getElementById("month");
var yearValue=document.getElementById("year");
var list=new Array(42);

function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}else{
		ele["on"+type]=handler;
	}
}

function hightLight(e){
  var temp=document.getElementById("day").getElementsByTagName("span");
  for(var i=0;i<temp.length;i++){//清除之前的高亮
      temp[i].removeAttribute("id");
      temp[i].removeAttribute("style");
  }
  e.target.setAttribute("style","background-color:#cff");
  e.target.setAttribute("id","selected");
}

function render(firstDay,curDay,curDays,lastDays){
	//渲染输出日历,参数分别为第一天的星期，当前选中日期的日，当前月的总天数，上个月的总天数  
    var len=list.length;
    //渲染输出日历
    if(firstDay===0){
        for(var i=0;i<len;i++){
       	  list[i]=i+1;
        }
    }else{
    	// list[firstDay]=1;
    	for(var j=firstDay,m=0,n=firstDay-1;j<len;j++,m++,n--){
            list[j]=m+1;
            list[n]=lastDays--;
    	}
    }
    for(var k=0;k<len;k++){
    	var span=document.createElement("span");
    	if(list[k]<10){
    		span.innerHTML=" "+list[k];
    	}else if(k>10 && list[k]>curDays){
    		if(list[k]-curDays<10){
    			span.innerHTML=" "+(list[k]-curDays);
    		}else{
    			span.innerHTML=list[k]-curDays;
    		}    		
    	}else{
    		span.innerHTML=list[k];
    	}
        if((k<=6 && list[k]>20) || (k>=30 && list[k]>curDays)){//设置灰色
            span.setAttribute("class","grayColor");
            // span.setAttribute("style","color:#ccc");
        }
    	if(k%7===0 && k!==0){
    	   calendar.appendChild(document.createElement("br"));
    	}
	    calendar.appendChild(span);
        addEvent(span,"click",hightLight);

        if(list[k]===curDay){//设置当前天为高亮
           span.setAttribute("id","selected");
           span.setAttribute("style","background-color:#cff"); 
        }   
    } 
}

function change(){
	calendar.innerHTML="";
	var curYear=yearValue.options[yearValue.selectedIndex].value; 
	var curMonth=monthValue.selectedIndex;
    var curDay;
    if(!document.getElementById("selected")){
        curDay=(new Date()).getDate();
    }
    // else{//
    //     curDay=document.getElementById("selected").innerHTML.trim();
    // }    
	var firstDay=getFirstDay(curYear,curMonth);
    var curdays=new Date(curYear,curMonth+1,0).getDate();
	var lastdays=new Date(curYear,curMonth,0).getDate();
    render(firstDay,curDay,curdays,lastdays);
}

function goPrevious(){
    var index=monthValue.selectedIndex;
    var index1=yearValue.selectedIndex;
    if(index>0){
	   index-=1;
       monthValue.options[index].setAttribute("selected","selected");
	   monthValue.options[index+1].removeAttribute("selected");
    }
    else{
       index1-=1;
       yearValue.options[index1].setAttribute("selected","selected");
       yearValue.options[index1+1].removeAttribute("selected");
       monthValue.options[11].setAttribute("selected","selected");
       monthValue.options[0].removeAttribute("selected");
    }
    change();
}

function goNext(){
    var index=monthValue.selectedIndex;
    var index1=yearValue.selectedIndex;
    if(index<11){
	   index+=1;
       monthValue.options[index].setAttribute("selected","selected");
	   monthValue.options[index-1].removeAttribute("selected");
    }
    else{
       index1+=1;
       yearValue.options[index1].setAttribute("selected","selected");
       yearValue.options[index1-1].removeAttribute("selected");
       monthValue.options[0].setAttribute("selected","selected");
       monthValue.options[11].removeAttribute("selected");
    }
    change();   
}

function getFirstDay(year,month){
    //获取当月第一天是星期几
	var first=new Date(year,month,1);
    var firstDay=first.getDay();
	return firstDay;
}

function getDefault(){
    var date=new Date();
    var curYear=date.getFullYear();//年
    var curMonth=date.getMonth();//月
    var curDay=date.getDate();//日
    var curWeek=date.getDay();//星期,从1到7
    var firstDay=getFirstDay(curYear,curMonth);//当月第一天星期
    var lastdays=new Date(curYear,curMonth,0).getDate();//上月最大天数
    var curdays=new Date(curYear,curMonth+1,0).getDate();//当前月最大天数
    render(firstDay,curDay,curdays,lastdays);   
}

function init(){
    //获取当前日期作为日历默认渲染结果
    getDefault();
    var previous=document.getElementById("previous");
    var next=document.getElementById("next");
    addEvent(previous,"click",goPrevious);
    addEvent(next,"click",goNext);
    addEvent(month,"change",change);
	addEvent(year,"change",change);
}

init();