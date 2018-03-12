function login() {

    var table=document.getElementById("tb");
    table.innerHTML="<tr>" +
        "                  <td onclick='login()'style='border-bottom: solid;padding: 10px'>登陆</td><td onclick=\"sign()\" style='padding: 10px'>注册</td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input placeholder=\"请输入您的手机号\" id=\"phone\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input type=\"password\" placeholder=\"请输入您的密码\" id=\"pswd\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n"+
        "                  <td colspan=\"2\" id=\"loginmsg\"></td>\n"+
        "              </tr>\n"+
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input type=\"button\" value=\"登陆\"class=\"login\" onclick=\"loginto()\"></td>\n" +
        "              </tr>";
}
function sign() {
    var table=document.getElementById("tb");
    table.innerHTML="<tr>\n" +
        "                  <td onclick='login()' style='padding: 10px'>登陆</td><td onclick=\"sign()\" style='border-bottom: solid;padding: 10px'>注册</td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input placeholder=\"请输入您的手机号码\" id=\"phone\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input placeholder=\"请输入您的昵称\" id=\"name\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input type=\"password\" placeholder=\"请输入您的密码\" id=\"passwd\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input type=\"password\" placeholder=\"请重复输入您的密码\" id=\"spasswd\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input placeholder=\"请输入您常驻城市\" id=\"city\"></td>\n" +
        "              </tr>\n" +
        "              <tr>\n" +
        "                  <td colspan=\"2\" style='font-size:30px;text-align:left;'><input type=\"radio\" name=\"sex\" id=\"male\" value=\"Male\">男生<input type=\"radio\" name=\"sex\" id=\"female\" value=\"Female\">女生</td>\n" +
        "              </tr>\n" +
        "              <tr>\n"+
        "                  <td colspan=\"2\" id=\"loginmsg\"></td>\n"+
        "              </tr>\n"+        
        "              <tr>\n" +
        "                  <td colspan=\"2\"><input type=\"button\" value=\"注册，即刻开始冒险！\"class=\"login\" onclick=\"register()\"></td>\n" +
        "              </tr>";
}
function loginto(){
    var xmlhttp;
    var phone=document.getElementById("phone").value;
    var pswd=document.getElementById("pswd").value;
    console.log(phone+" "+pswd);
    if(phone=="" || pswd==""){
         document.getElementById("loginmsg").innerHTML="<p class='msg'>"+"请输入手机号或密码"+"</p>";
         return;
    }
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            var content=xmlhttp.responseText;
            console.log("拿到的原始数据："+content);
            if(content.indexOf("登陆成功")!=-1){
                content=content.slice(0,content.indexOf("登"));
                console.log(content);
                if(content=="Mike"){
                    var url=encodeURI("Administrator.html");
                    window.open(url);
                }
                else{
                var url=encodeURI("Home.html?user="+content);
                window.open(url);                    
                }

            }
            else {

                document.getElementById("loginmsg").innerHTML="<p class='msg'>"+content+"</p>";
            }
        }
    }
    xmlhttp.open("POST","1-2find.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("phone="+phone+"&pswd="+pswd);
}
function register(){
    var phone=document.getElementById("phone").value;
    var name=document.getElementById("name").value;
    var passwd=document.getElementById("passwd").value;
    var spasswd=document.getElementById("spasswd").value;
    var arr=document.getElementsByName("sex");
    var city=document.getElementById("city").value;
    var xmlhttp;
    var sex;

    for(var i=0;i<arr.length;i++)
    {
        if(arr[i].checked)
        {
            sex=arr[i].value;
            break;
        }
    }
    if(phone=="" || name=="" || passwd=="" || spasswd=="" || sex=="" || city==""){
        document.getElementById("loginmsg").innerHTML="<p class='msg'>"+"请把表单填写完整"+"</p>";
        return;
    }
    if(passwd!=spasswd){
        document.getElementById("loginmsg").innerHTML="<p class='msg'>"+"两次输入密码不一致"+"</p>";
        return;      
    }
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            var content=xmlhttp.responseText;
            console.log("拿到的原始数据：" + content);
            if(content.indexOf("注册成功")!=-1){
                var url=encodeURI("Home.html?user="+name);
                window.open(url);        
            }
            else{
                document.getElementById("loginmsg").innerHTML="<p class='msg'>"+content+"</p>";
            }
            
        }
    }
    xmlhttp.open("POST","1-4addusers.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("phone="+phone+"&username="+name+"&upassword="+passwd+"&sex="+sex+"&city="+city);

}