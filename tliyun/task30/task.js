
var flag1=false,flag2=false,flag3=false,flag4=false,flag5=false;

function test(){
  testName();
  testName1();
  testPsw();
  testPsw2();
  testEmail();
  testPhonenum();
  if(flag1 && flag2 && flag3 && flag4 && flag5){
    alert("提交成功！");
  }else{
    alert("输入有误！");
  }
}

function testPhonenum(){
  var data=document.getElementById('input5').value;
  var hint5=document.getElementById('hint5');
  var regex=/^1[3|5|7|8|][0-9]{9}$/;
  if(data===""){
    hint5.innerHTML="请输入手机号";
    hint5.style.color="red";
    return;
  }else if(regex.test(data)){
    hint5.innerHTML="手机格式正确";
    hint5.style.color="green";
    flag5=true;
    return;
  }else{
    hint5.innerHTML="手机格式不正确";
    hint5.style.color="red";
  }
}

function testEmail(){
  var data=document.getElementById('input4').value;
  var hint4=document.getElementById('hint4');
  var regex=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  if(data===""){
    hint4.innerHTML="请输入邮箱";
    hint4.style.color="red";
    // flag4=false;
    return;
  }else if(regex.test(data)){
    hint4.innerHTML="邮箱格式正确";
    hint4.style.color="green";
    flag4=true;
    return;
  }else{
    hint4.innerHTML="邮箱格式错误";
    hint4.style.color="red";
  }
}

function testPsw2(){
  var data=document.getElementById('input3').value;
  var hint3=document.getElementById('hint3');
  if(data===""){
    hint3.innerHTML="请再次输入密码";
    hint3.style.color="red";
    return;
  }else if(data===document.getElementById('input2').value){
    hint3.innerHTML="输入密码一致";
    hint3.style.color="green";
    flag3=true;
    return;
  }else{
    hint3.innerHTML="输入密码不一致";
    hint3.style.color="red";
  }
}

function testPsw(){
  var data=document.getElementById('input2').value;
  var hint2=document.getElementById('hint2');
  if(data===""){
    hint2.innerHTML="请输入密码";
    hint2.style.color="red";
    return;
  }else{
    hint2.innerHTML="密码可用";
    hint2.style.color="green";
    flag2=true;
  }
}

function prompt(length){
    if(length===0){
       document.getElementById('hint1').innerHTML="名称不能为空";
       document.getElementById('hint1').style.color="red";
       return;
    }
    if(length<4 || length>16){
      document.getElementById('hint1').innerHTML="输入格式不正确";
      document.getElementById('hint1').style.color="red";
    }else{
      document.getElementById('hint1').innerHTML="输入格式正确";
      document.getElementById('hint1').style.color="green";
      flag1=true;
    }
}

function testName1() 
{ 
  var data=document.getElementById('input1').value;
  if(data===null){
    return;
  }
  var length = 0;  
  for (var i=0; i<data.length; i++) 
  {
     var c = data.charCodeAt(i);  
     //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
        length++;  
       }else{
          length+=2;
       } 
    }
    prompt(length);
}

function testName(){
  document.getElementById('hint1').innerHTML="必填，长度为4~16个字符";
  document.getElementById('hint1').style.color="red";
}

function init(){
  //添加验证功能
  document.getElementById('input1').addEventListener('focus',testName);
  document.getElementById('input1').addEventListener('blur',testName1);

  document.getElementById('input2').addEventListener('blur',testPsw);
  document.getElementById('input3').addEventListener('blur',testPsw2);

  document.getElementById('input4').addEventListener('blur',testEmail);
  document.getElementById('input5').addEventListener('blur',testPhonenum);

	// //绑定点击验证事件
	document.getElementById('test').addEventListener('click',test);
}

init();