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
//下拉表单点击显示
function choosego(){
    var contrys=document.getElementById("contrys");
    contrys.style.display="block";

}
function ClickCancel(){
    document.getElementById("contrys").style.display="none";
}
//选择目的地后直接跳转网页
function choosecon(obj){
    var destination=this.innerText;
    console.log(destination);
    var putin=document.getElementById("putin");
    var contrys=document.getElementById("contrys");
    contrys.style.display="none";
    putin.value=destination;
    var url=encodeURI("Dest.html?cdes="+destination);
    window.open(url);

}
function ImgChange(imgs,i,interval){
   setTimeout(function(){ImgChangeByTime(imgs,i,interval)},2000);


}
function ImgChangeByTime(imgs,i,interval){
    console.log("这是第"+i+"个元素");
    if(imgs[i].style.opacity==0){
        imgs[i].style.display="none";
        i++;
        if(i==imgs.length){ //如果到达最后一个元素则重新开始
            i=0;
        }
        ImgChange(imgs,i,interval); 
        return;
    }
    for(var j=0;j<imgs.length;j++){ //为当前和下一个图片添加block，其他均为none

        if(j==i || j==(i+1)%imgs.length){
           // console.log(j+"是显示为block的元素")
            imgs[j].style.display="block";
        }
        else{
        imgs[j].style.display="none";            
        }

    }
    imgs[i].style.opacity-=0.1;
    imgs[(i+1)%imgs.length].style.opacity=1-imgs[i].style.opacity;
    movement=setTimeout(function(){ImgChangeByTime(imgs,i,interval)},interval);

}
function OnShareGo(){
    var destination=this.getAttribute("value");
    var url=encodeURI("Dest.html?cdes="+destination);
    window.open(url);
}
window.onload=function(){
	loaduser();
    //为目的地下拉表单添加点击事件
    var contrys=document.getElementById("contrys");
    var lists=contrys.getElementsByTagName("li");
    for(var i=0;i<lists.length;i++){
        lists[i].addEventListener("click",choosecon);
    }
    //为下拉表单添加点击其他区域取消显示
    document.getElementById("departu").addEventListener("click",ClickCancel);
    //初始化大图显示和透明度，其他均为none
    var imgs=document.getElementById("imgslide").getElementsByTagName("img");
    imgs[0].style.opacity=1;
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.display="none";
        imgs[i].style.opacity=0;
    }
    //调用图片动画函数
    ImgChange(imgs,0,100);
    //为首页推荐的目的地添加点击事件
    var share_deses=document.getElementById("share").getElementsByTagName("img");
    for(var i=0;i<share_deses.length;i++){
        share_deses[i].style.cursor="pointer";
        share_deses[i].addEventListener("click",OnShareGo);
    }
};