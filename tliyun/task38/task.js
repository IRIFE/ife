var table=document.createElement("table");
var thContent=["姓名","语文","数学","英语","总分"];
var rowContent=[["小明",90,90,70],["小红",90,60,90],["小亮",60,100,70]];  //总分由分数相加得出

function swap(a,b){//交换两个数组
  var temp;
  for(var i=0;i<rowContent[1].length;i++){
    temp=a[i];
    a[i]=b[i];
    b[i]=temp;
  }
}

function doSort(e){
  var item=e.target.parentNode.innerHTML.split('<')[0];
  var index=thContent.indexOf(item);  //当前点击元素的序号
  // alert(index);
  var list=[];
  for(var i=0;i<rowContent.length;i++){
    list[i]=rowContent[i][index];
  }

  for(var k=0;k<list.length;k++)//冒泡排序，降序
    for(var l=k+1;l<list.length;l++){
       if(parseInt(list[k]) < parseInt(list[l])){
          var temp=list[k];
          list[k]=list[l];
          list[l]=temp;   
          swap(rowContent[k],rowContent[l]);
       }  
  }

  for(var j=table.childNodes.length-1;j>0;j--){//删除除了表头的其他行
    var node=table.childNodes[j];
    table.removeChild(node);
  }
  createContent();
}

function addSort(){
  var btn=document.getElementsByClassName('sort-btn');
  for(var i=0;i<btn.length;i++){
    if(btn[i].addEventListener){
      btn[i].addEventListener("click",doSort);
    }
    else if(btn[i].attachEvent){
      btn[i].attachEvent("onclick",doSort);
    }else{
      btn[i].onclick=dosort();
    }
  }
}

function createTr(content){
  var trNode=document.createElement("tr");

  for(var j=0;j<content.length;j++){
    var td=document.createElement("td");
    td.innerHTML+=content[j]; 
    trNode.appendChild(td); 
  }
  table.appendChild(trNode);
}

function createContent(){
  for(j=0;j<rowContent.length;j++){
     createTr(rowContent[j]);
  }
}

function createHead(){
  var thNode=document.createElement("tr");
    var thead=document.createElement("th");
    thead.innerHTML=thContent[0];
    thNode.appendChild(thead);

  for(var i=1;i<thContent.length;i++){
    var th=document.createElement("th");
    th.innerHTML=thContent[i]+"<span class='sort-btn'>"+"&nabla;"+"</span>";
    thNode.appendChild(th);
  }
  table.appendChild(thNode); 
}

function createTable(){
  var div=document.getElementById("wrap");
  div.appendChild(table);
  createHead();//创建表头
  
  for(var j=0;j<rowContent.length;j++){
      //计算总分并加入数组中
    var total=0;
    for(var i=1;i<rowContent[j].length;i++){
        total+=rowContent[j][i];
    }
    rowContent[j].length++;
    rowContent[j][rowContent[j].length-1]=total; 
  }  

  createContent();//创建表格内容
}

function init(){
  createTable();//创建表格
  addSort();//添加排序功能
}

init();