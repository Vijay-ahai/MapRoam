function getmsg(dep,des){
     var xmlhttp;
     //console.log("sss");
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
                document.getElementById("sorry").innerText="不存在的地区或景点";
                return;
            }            
            var msg=content.split("<br>");


            /*渲染地区*/
            var pname=document.getElementById("pname");
            pname.innerText=msg[0].slice(msg[0].indexOf("-")+1);
            /*提取货币单位*/
            var currency=msg[1].slice(msg[1].indexOf("：")+1);
            /*背景贴图*/
            var back=document.getElementById("trafficback");
            back.innerHTML="<img class='des' src='resources/trafficgo.jpg'>";
            var table=document.getElementById("way");
            var html="<tr><td colspan='6'>抱歉，两地暂未开通可行交通方式</td></tr>"; 
            if(content.indexOf("查找成功")!=-1){
                /*渲染线路对应的交通方式*/
                html="";
            var pline=document.getElementById("pline");        
            var line=msg[2].slice(msg[2].indexOf("：")+1);
            var site=line.split("->");                          //提取景点存在site中
            var transmsg=msg[3].slice(msg[3].indexOf("：")+1).split("->");  //提取交通方式
            var k;
            
            for(k=0;k<site.length-1;k++){
                var dep=site[k].slice((msg[0].slice(msg[0].indexOf("：")+1)).length+1);
                if((k+2)==site.length)
                    var des=site[k+1].slice((msg[0].slice(msg[0].indexOf("：")+1)).length+1,-4);
                else
                    var des=site[k+1].slice((msg[0].slice(msg[0].indexOf("：")+1)).length+1);
                var trmsg="<tr><td colspan='3' class='tdname'>"+dep+'--'+des+"</td></tr>";
                console.log("景点：" + trmsg);
                var i;
                var trstr="<tr><td><img src='resources/{pic}.png'></td><td>{way}</td><td>{time}</td><td>{cost}</td><td>约{level}%的人选择此种出行方式</td><td>现在购票</td></tr>"
                
                html+=trmsg;
                //console.log(msg[3]);
                var transport=transmsg[k].split("AND");
                for(i=0;i<transport.length-1;i++){           //去掉多余的AND行
                    console.log(transport[i]);
                    var item=transport[i].split("&");
                    var per=item[2]/5*100;
                    //console.log(per);
                    if(item[0]=="新干线")
                        html+=trstr.replace("{pic}","火车").replace("{way}","火车").replace("{time}",item[1]).replace("{cost}",item[3]+currency).replace("{level}",per);
                    else if(item[0].indexOf("航空")!=-1)
                        html+=trstr.replace("{pic}","飞机").replace("{way}","飞机").replace("{time}",item[1]).replace("{cost}",item[3]+currency).replace("{level}",per);
                    else if(item[0].indexOf("运输")!=-1  )
                        html+=trstr.replace("{pic}","轮船").replace("{way}","轮船").replace("{time}",item[1]).replace("{cost}",item[3]+currency).replace("{level}",per);
                    else if(item[0]=="步行")
                        html+=trstr.replace("{pic}",item[0]).replace("{way}",item[0]).replace("{time}",item[1]).replace("{cost}","--").replace("{level}",per).replace("现在购票","查看地图");
                    else
                        html+=trstr.replace("{pic}",item[0]).replace("{way}",item[0]).replace("{time}",item[1]).replace("{cost}",item[3]+currency).replace("{level}",per);

                
                }
                //console.log(html);

            }
            }
            
            
           // pline.innerText=dep+"--"+des;
            
            html+="<tr><td colspan='6' class='tdname'>以上方式不够心动？即刻租车自驾！多人拼车，遇上途中的伙伴！</td></tr><tr><td><img src='resources/自驾.png'> </td><td>自驾</td><td>--</td><td>--</td><td>站长推荐！</td><td>现在选购！</td></tr>"
            table.innerHTML=html;
            /*清除错误提示*/
            document.getElementById("sorry").innerText="";
            
        }
    }
    xmlhttp.open("GET","traffic.php?dep="+dep+"&des="+des,true);
    xmlhttp.send();
    console.log("已发送");
}
function pageload() {
    var msg=window.location.href;
    var dep=msg.slice(msg.indexOf("departure"),msg.indexOf("destination"));
    dep=decodeURI(dep.slice(dep.indexOf("=")+1));
    var des=msg.slice(msg.indexOf("destination"));
    des=decodeURI(des.slice(des.indexOf("=")+1));
    console.log(dep+" "+ des);
    if(dep!="" && des!=""){
        //var pname,pline;
        //pline=dep+"——"+des;
        //document.getElementById("pline").innerText=pline;         //更新目的地
        
        getmsg(dep,des);
        //console.log("aa");
        
    }

}

window.onload=function(){
    pageload()

};