/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 0; i < 90; i++) {  //从0到89，共90天的数据
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

var timeSelect = document.getElementById("form-gra-time");
var chartWrap=document.getElementById('aqi-chart-wrap');
var cityList=document.getElementById('city-select');
var days=90;  //设置默认天数

/**
 * 渲染图表
 */
function renderChart() {
  chartWrap.innerHTML = ""; 
  var charLength = Object.keys(chartData).length; 
  for (var item in chartData) { 
    var columella = document.createElement("div");  
    chartWrap.appendChild(columella); 
    columella.className = "bar"; 
    var height = chartData[item]; 
    columella.setAttribute("title",item+"  AQI:"+height);  //添加title属性，显示小浮窗
    var containerWidth = chartWrap.offsetWidth;   //offsetWidth是对象的可见宽度，会随窗口的显示大小改变
    var containerHeight = chartWrap.offsetHeight; 
    columella.style.width = containerWidth / charLength+"px"; 
    columella.style.height = height+"px"; 

    switch(true){
      case height<100:
        columella.style.backgroundColor="green";
        break;
      case height<200:
        columella.style.backgroundColor="blue";
        break;
      case height<300:
        columella.style.backgroundColor="grey";
        break;
      case height<400:
        columella.style.backgroundColor="red";
        break;
      default:
        columella.style.backgroundColor="black";
    }
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化
  var graTime=value;
  if(pageState.nowGraTime === graTime)
    return;  
  pageState.nowGraTime=graTime;
  // alert(pageState.nowGraTime);
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  selectCity=cityList.value;
  if(selectCity === pageState.nowSelectCity)
    return;
  pageState.nowSelectCity=selectCity;
  // alert(pageState.nowSelectCity);
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  timeSelect.addEventListener("click",function(event){
    if(event.target && event.target.nodeName.toLowerCase()==="input"){
      graTimeChange(event.target.value);
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // var cityNums=Object.keys(aqiSourceData).length;  //获取长度
    var content="";
    for(var city in aqiSourceData){
      content+="<option>"+city+"</option>";
      // cityList.options.add(new Option(city));  //这种方式可以添加城市元素
    }
    cityList.innerHTML=content;
      // 给select设置事件，当选项发生变化时调用函数citySelectChange
    cityList.addEventListener("change",citySelectChange);
}

//按照类型统计数据
function getNewData(nowSelectCity,type){
   var sourceData = {}; 
   var flag = 0,   //星期计数
      dayCounter = 0,   //天计数
      index = 0,   //总的天数计数
      sum = 0; 

  for (var formatDate in aqiSourceData[nowSelectCity]) { 
      //formatData为日期，格式为2016-01-01 
      var dateInfo = formatDate.split("-");
      var date = new Date(parseInt(dateInfo[0]), parseInt(dateInfo[1]), parseInt(dateInfo[2]));
      var day = date.getDay();   //获取该日期的星期，0表示星期日
      var month = date.getMonth();   //获取该日期的月份，0表示一月

      if (type == "week") {   
          if (day < 6 && index < days - 1) { 
              sum += parseInt(aqiSourceData[nowSelectCity][formatDate]);   //每天的aqi值相加
              dayCounter++; 
          } else {   //获取一周最后一天的数据，即周六的，此时day=6
            //或者是不足一周，获取最后一天的数据，此时days=89
              sourceData["第" + (flag + 1) + "周平均"] =Math.floor( 
                (sum + parseInt(aqiSourceData[nowSelectCity][formatDate])) / dayCounter); 
              //floor表示向下舍入
              sum = 0; 
              dayCounter = 0; 
              flag++; 
           } 
      }

      if (type === "month") { 
           if ((sourceData["第" + month + "月平均"] === undefined) &&   
            sourceData["第" + (month - 1) + "月平均"] !== undefined) { 
            //一个月的第一天，且不是1月,计算上个月的数据
              sourceData["第" + (month - 1) + "月平均"] = Math.floor(sum / dayCounter); 
           } 
          if (sourceData["第" + month + "月平均"] === undefined) {
            //一个月的第一天
              sourceData["第" + month + "月平均"] = 0; 
              sum = 0; 
              dayCounter = 0; 
           }
           if (index === days - 1) {
            //最后一天，对应3月
              sourceData["第" + month + "月平均"] = Math.floor((
                sum + parseInt(aqiSourceData[nowSelectCity][formatDate])) / dayCounter); 
           }
           //统计数据 
           sum += parseInt(aqiSourceData[nowSelectCity][formatDate]); 
           dayCounter++; 
      } 
      index++; 
  } 
  return sourceData; 
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  switch(pageState.nowGraTime){
    case "day":
      chartData=aqiSourceData[pageState.nowSelectCity];  //直接获取当前城市的数据
      break;
    case "week":
      chartData=getNewData(pageState.nowSelectCity,"week");
      break;
    case "month":
      chartData=getNewData(pageState.nowSelectCity,"month");
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
