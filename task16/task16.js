/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = new Array();

/**
用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var qulity = document.getElementById("aqi-value-input").value.trim();
    if (!isName(city)) {
        alert("城市输入有误");
        return;
    }
    if (!isInt(qulity)) {
        alert("空气质量应为整数");
        return;
    }
    var size = aqiData.length;
    aqiData[size] = new Array(); //建立二维数组
    aqiData[size].push(city);
    aqiData[size].push(qulity);
    // 排序
    aqiData = aqiData.sort(function(a, b) {
        return a[1] - b[1];
    });
}

function isName(name) { //用正则表达式
    /*--match()方法 “字符串” /正则表达式/--*/
    return name.match(/^[A-Za-z\u4E00-\u9FA5]+$/);
}

function isInt(num) {
    return Math.ceil(num) == num; //通过向下取整后是否一致来判断
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var currentTable = "";
    for (var i = 0; i < aqiData.length; i++) {
        currentTable += "<tr><td>" + aqiData[i][0] + "</td><td>" + aqiData[i][1] + "</td><td><button>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = currentTable;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var delRow=target.parentNode.parentNode;
    var table=delRow.parentNode;
    table.removeChild(delRow);

    //renderAqiList();
}

function init() {
    var addBtn = document.getElementById("add-btn");
    // addBtn.onclick = addBtnHandle();
    addBtn.addEventListener("click", addBtnHandle);

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var table = document.getElementById("aqi-table");
    table.addEventListener("click", function(e) {
            if (e.target && e.target.nodeName.toLowerCase() == "button") { delBtnHandle(e.target); }
        })
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
