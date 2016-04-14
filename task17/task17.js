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
//默认变量值
var days=90;//天数
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
    var datStr = ''
    for (var i = 1; i < days; i++) {
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
}
var timeSelect = document.getElementById("form-gra-time");
var citySelect = document.getElementById("city-select");
var chartwrap = document.getElementById("aqi-chart-wrap");

/**
 * 渲染图表
 */
function renderChart() {
    chartwrap.innerHTML = "";
    var charLength=Object.keys(chartData).length;
    for (var item in chartData) {
        var colume = document.createElement("div");
        // alert(colume.nodeName);
        chartwrap.appendChild(colume);
        colume.className = "bar";
        var height = chartData[item];
        var containerWidth = chartwrap.offsetWidth;
        var containerHeight=chartwrap.offsetHeight;
        colume.style.width = containerWidth /charLength ;
        var proHeight=height*charLength/days;// 按比例的高度
        colume.style.height =proHeight ;

        switch (true) {//按空气质量上色
            case proHeight < 50:
                colume.style.backgroundColor = "green";
                break;
            case proHeight < 150:
                colume.style.backgroundColor = "blue";
                break;
            case proHeight < 250:
                colume.style.backgroundColor = "purple";
                break;
            case proHeight < 350:
                colume.style.backgroundColor = "red";
                break;
            default:
                colume.style.backgroundColor = "black";
        }
    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
    var graTime = target.value;
    if (graTime == pageState.nowGraTime)
        return;
    pageState.nowGraTime = graTime;
    // 确定是否选项发生了变化 
    initAqiChartData();
    // 设置对应数据
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    selectCity = citySelect.value;
    if (selectCity == pageState.nowSelectCity)
        return;
    pageState.nowSelectCity = selectCity;
    // 确定是否选项发生了变化 
    initAqiChartData();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    // pageState.nowGraTime = timeSelect.value;//bug
    timeSelect.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "input") { graTimeChange(e.target); }
    })
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var content = "";
    // // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for (var city in aqiSourceData) {
        content += "<option>" + city + "</option>>";
    }
    citySelect.innerHTML = content;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener("change", citySelectChange);
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    switch (pageState.nowGraTime) {
        case "day":
            chartData = aqiSourceData[pageState.nowSelectCity];
            break;
        case "week":
            chartData = restructSourceData(pageState.nowSelectCity, "week");
            break;
        case "month":
            chartData = restructSourceData(pageState.nowSelectCity, "month");
    }
    // 调用图表渲染函数
    renderChart();
}
function restructSourceData(nowSelectCity, type) {
    var sourceData = {};
    var flag = 0,
        sum = 0; //记录周号
    for (var formatDate in aqiSourceData[nowSelectCity]) {
        //date format 2016-01-01
        var dateInfo = formatDate.split("-");
        var date = new Date(parseInt(dateInfo[0]), parseInt(dateInfo[1]), parseInt(dateInfo[2]))
        var day = date.getDay();
        var month = date.getMonth();
        if (type == "week") {
            if (day < 6) {
                sum += parseInt(aqiSourceData[nowSelectCity][formatDate]);
            } else {
                sourceData["第" + (flag + 1) + "周"] = sum + parseInt(aqiSourceData[nowSelectCity][formatDate]);
                sum = 0;
                flag++;
            }
        } 
        if (type == "month") {
            if(sourceData["第" + month + "月"]==undefined)
              sourceData["第" + month + "月"]=0;
            sourceData["第" + month + "月"] += parseInt(aqiSourceData[nowSelectCity][formatDate]); 
        } 
    }
    return sourceData;
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
