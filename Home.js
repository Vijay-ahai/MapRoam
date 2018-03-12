function cgo(){
	var cdes=document.getElementById("putin").value;
    console.log(cdes);
    if(cdes!="" && cdes!=""){
        var url=encodeURI("Dest.html?cdes="+cdes);
        window.open(url);
    }
}
function loaduser(){
	var msg=window.location.href;
	console.log(msg);
	if(msg.indexOf("user=")!=-1){
        if(msg.indexOf("#")!=-1)
            var name=msg.slice(msg.indexOf("=")+1,msg.indexOf("#"));
        else
		    var name=msg.slice(msg.indexOf("=")+1);
        name=decodeURI(name);
        console.log(name);
        if(name!="" ||name!=null){
    	document.getElementById("user").innerHTML="欢迎，"+name+"";
        }
	}
    
}

window.onload=function(){
	loaduser()
};