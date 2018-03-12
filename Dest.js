
var route={};    //创建地区线路的关联数组
function depar() {
    var departure=document.getElementById("departure").value;
    var destination=document.getElementById("destination").value;
    console.log(departure + destination);
    if(departure!="" && destination!=""){
        var url=encodeURI("Traffic.html?departure="+departure+"destination="+destination);
        window.open(url);
    }
}

function pageload() {
    var msg=window.location.href;
    var cdes=msg.slice(msg.indexOf("=")+1);
    cdes=decodeURI(cdes);
    console.log(cdes);
    if(cdes!="" && cdes!=""){
        
        document.getElementById("tdcname").innerText=cdes; //更新目的地
        document.getElementById("ppoint").innerText=cdes+"热门景点";
        document.getElementById("pline").innerText=cdes+"经典行程";
        loadmsg(cdes);
        loadsite(cdes);
    }

}
function loadmsg(cdes){
	var xmlhttp;
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
            console.log("拿到的原始数据： " + xmlhttp.responseText);
            if(content.indexOf("不存在")!=-1){
            	document.getElementById("point").innerHTML="";
            	document.getElementById("droute").innerHTML="";
            	document.getElementById("tcname").innerHTML="<p style='color:#505050;font-size:40px;'>抱歉，此国家图图还在努力收入中，试试其他国家吧！(〃'▽'〃)</p>"
            	return ;
            }
            else{
            	/*更改北京贴图*/
            	var img="<img src='{path}'>";
            	img=img.replace("{path}","resources/"+"Dest_"+cdes+".jpg");
            	document.getElementById("countrypic").innerHTML=img;
            	/*渲染地区数据*/
                var tdstr="";
                var msg=content.split("<br>");
                console.log(msg.length);
                var site=msg[0].slice(msg[0].indexOf("：")+1).split("&");
                var line=msg[1].slice(msg[1].indexOf("：")+1).split("&");
                var i;
                for(i=0;i<site.length-1;i++){
        	    tdstr+="<td onmouseover=rbyhover('{name}')>"+site[i]+"</td>";
        	
        	    tdstr=tdstr.replace("{name}",site[i]);
        	    console.log(tdstr);
        	    route[site[i]]=line[i];
                }
                document.getElementById("rarea").innerHTML=tdstr;
                /*渲染路线，只渲染第一项*/
                document.getElementById("line").innerText=route[site[0]];
                var img="<img src='{path}'>";
	            img=img.replace("{path}","resources/"+site[0]);
                document.getElementById("linepic").innerHTML=img;
            }
            
    	}
    	

    }
    xmlhttp.open("GET","2-2recommend.php?cdes="+cdes,true);
    xmlhttp.send();
    console.log("已发送");
}
function loadsite(cdes){
    var xmlhttp;
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
            var msg=content.split("<br>");
            var i;
            var tsite=document.getElementById("site");
            var html="";
            for(i=0;i<msg.length-1;i++){
                html+="<td>";
                var sitestr=msg[i].slice(msg[i].indexOf("：")+1);
                var aname=msg[i].slice(0,msg[i].indexOf("："));
                aname=aname.replace(/[\r\n]/g, "");
                //console.log(aname);
                var taname=aname.slice(aname.indexOf("-")+1);
                var site=sitestr.split("&");
                html+="<img src=\"resources/site_"+taname+".jpg\" class=\"share\">"+"<p class=\"share1\">"+taname+"</p><p class=\"share2\">";
                for(j=0;j<3;j++){
                    console.log(aname);
                    console.log(site[j].indexOf(aname)+ " "+ site[j]);
                    site[j]=site[j].slice(aname.length+1);
                    html+=site[j]+" ";
                }
                html+="..."+"</p></td>";
            }
            tsite.innerHTML=html;
        }
    }
    xmlhttp.open("GET","2-2findplace.php?cdes="+cdes,true);
    xmlhttp.send();
    console.log("已发送"); 
}
function rbyhover(des){
	document.getElementById("line").innerText=route[des];
	var img="<img src='{path}'>";
	img=img.replace("{path}","resources/"+des);
	document.getElementById("linepic").innerHTML=img;
}
window.onload=function(){
	pageload()
};