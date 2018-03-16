function cgo(){
	var cdes=document.getElementById("putin").value;
    console.log(cdes);
    if(cdes!="" && cdes!=""){
        var url=encodeURI("Dest.html?cdes="+cdes);
        window.open(url);
        document.getElementById("contrys").style.display="none";
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
function choosego(){
    var contrys=document.getElementById("contrys");
    contrys.style.display="block";

}
function choosecon(obj){
    var destination=this.innerText;
    console.log(destination);
    var putin=document.getElementById("putin");
    var contrys=document.getElementById("contrys");
    contrys.style.display="none";
    putin.value=destination;

}
window.onload=function(){
	loaduser();
    var contrys=document.getElementById("contrys");
    var lists=contrys.getElementsByTagName("li");
    for(var i=0;i<lists.length;i++){
        lists[i].addEventListener("click",choosecon);
    }
};