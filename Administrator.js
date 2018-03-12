function add_lplan(){
	var rid=document.getElementById("rid").value;
	var number=document.getElementById("number").value;
	var starlevel=document.getElementById("starlevel").value;
	if(rid == "" || number == "" || starlevel == ""){
		document.getElementById("showadd").innerText="请输入有效信息！";
		return ;		
	}
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
        	console.log("拿到的原始数据：" + content)
        	if(content.indexOf("成功")!=-1){
        		document.getElementById("showadd").innerText=content;
        	}
        	else{
        		document.getElementById("showadd").innerText="请确保线路ID和对应班次编号存在！";
        	}
        }
    }
    xmlhttp.open("GET","3-1inlplan.php?number="+number+"&rid="+rid+"&starlevel="+starlevel,true);
    xmlhttp.send();	
}
function upd_ltraffic(){
	var number=document.getElementById("snumber").value;
	var price=document.getElementById("price").value;
	console.log(number + price);
	if(number == "" || price == ""){
		document.getElementById("showupdate").innerText="请输入有效信息！";
		return ;
	}
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
        	console.log("拿到的原始数据：" + content)
        	if(content.indexOf("成功")!=-1){
        		document.getElementById("showupdate").innerText=content;
        	}
        	else{
        		document.getElementById("showupdate").innerText="请确认班次编号存在！";
        	}
        }
    }
    xmlhttp.open("POST","3-2updprice.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("number="+number+"&price="+price);
}