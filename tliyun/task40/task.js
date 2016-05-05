var calendar=document.getElementById("day");
var monthValue=document.getElementById("month");
var yearValue=document.getElementById("year");

function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}else{
		ele["on"+type]=handler;
	}
}

function render(firstDay,curdays,lastdays){
	//渲染输出日历,参数分别为第一天的星期，当前月的总天数，上个月的总天数  
    var list=new Array(42);
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
            list[n]=lastdays--;
    	}
    }
    for(var k=0;k<len;k++){
    	var span=document.createElement("span");
    	if(list[k]<10){
    		span.innerHTML=" "+list[k];
    	}else if(k>10 && list[k]>curdays){
    		if(list[k]-curdays<10){
    			span.innerHTML=" "+(list[k]-curdays);
    		}else{
    			span.innerHTML=list[k]-curdays;
    		}    		
    	}else{
    		span.innerHTML=list[k];
    	}
    	if(k%7===0 && k!==0){
    	   calendar.appendChild(document.createElement("br"));
    	}
	    calendar.appendChild(span);      
    }
}

function change(){
	calendar.innerHTML="";
	var curYear=yearValue.options[yearValue.selectedIndex].value; 
	var curMonth=monthValue.selectedIndex;
	var firstDay=getFirstDay(curYear,curMonth);
    var curdays=new Date(curYear,curMonth+1,0).getDate();
	var lastdays=new Date(curYear,curMonth,0).getDate();
    render(firstDay,curdays,lastdays);
}

function goPrevious(){
    var tempMonth=document.getElementById("month");
    var index=tempMonth.selectedIndex;
    if(index>0){
	   index-=1;
       tempMonth.options[index].setAttribute("selected","selected");
	   tempMonth.options[index+1].removeAttribute("selected");
    }
    else{
       tempMonth.options[0].setAttribute("selected","selected");
    }
    change();
}

function goNext(){
    var tempMonth=document.getElementById("month");
    var index=tempMonth.selectedIndex;
    if(index<11){
	   index+=1;
       tempMonth.options[index].setAttribute("selected","selected");
	   tempMonth.options[index-1].removeAttribute("selected");
    }
    else{
       tempMonth.options[11].setAttribute("selected","selected");
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
    render(firstDay,curdays,lastdays);   
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