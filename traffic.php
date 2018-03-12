<?php
include "travel_conn.php";
ini_set("display_errors","Off");  
$departure=$_GET['dep'];
$destination=$_GET['des'];
//echo $departure.$destination;
//$departure="上海";
//$destination="成都";
$ar=array();
$len;
$sql="select areaname from site where sitename like '%$departure';";     //0.根据输入出发地景点查找所在地区
$res=@mysql_query($sql) or die (mysql_error());
$row=mysql_num_rows($res);
if($row){
	for($i=0;$i<$row;$i++){
		$dbrow=mysql_fetch_array($res);
		$area=$dbrow['areaname'];
	}
}
if($area==null){
    echo "不存在该地区或景点";
    return ;
}
$departure=$area."-".$departure;

$sql="select areaname from site where sitename like '%$destination';";
$res=@mysql_query($sql) or die (mysql_error());
$row=mysql_num_rows($res);
if($row){
	for($i=0;$i<$row;$i++){
		$dbrow=mysql_fetch_array($res);
		$area=$dbrow['areaname'];
	}
}
echo "目标地区为：".$area."<br>";                          //1.根据输入目的地景点查找所在地区
$len=strlen($area);

$destination=$area."-".$destination;
//echo $departure.$destination;
$sql="select c.currency from country c,area a where a.areaname='$area' and a.countryname=c.countryname;";
$res=@mysql_query($sql) or die (mysql_error());
$row=mysql_num_rows($res);
if($row){
	for($i=0;$i<$row;$i++){
		$dbrow=mysql_fetch_array($res);
		$currency=$dbrow['currency'];
	}
}
echo "货币单位：".$currency."<br>";                      //2.输出货币单位
echo "路线为：".$departure."->";
makeroute($departure,$destination);                       //3.调用递归函数开始查找路线
echo "交通信息为：";
for($i=0;$i<count($ar);$i++){                             //4.根据路线号返回交通信息
	$id=$ar[$i];
	//echo $id;
	$sql="select lt.company,l.Timecost,l.Starlevel,lt.avg_price    
    from lplan l,ltraffic lt 
    where l.route_id='$id' 
    and l.number=lt.number;";           //公共交通
    $res=@mysql_query($sql) or die(mysql_error());
    $row=mysql_num_rows($res);
    if($row){
    	for($j=0;$j<$row;$j++){
    		$dbrow=mysql_fetch_array($res);
    		$ptype=$dbrow['company'];
    		$Timecost=$dbrow['Timecost']."小时";
    		$Starlevel=$dbrow['Starlevel'];
    		$avgprice=$dbrow['avg_price'];
    		echo $ptype."&".$Timecost."&".$Starlevel."&".$avgprice."AND";
    	}
    }
    $sql="select pr.ptype,pr.Timecost,pr.Starlevel,pt.avgprice    
    from pubtrans_route pr,public_trans pt 
    where pr.route_id='$id' 
    and pr.ptype=pt.ptype and pr.number=pt.number;";           //公共交通
    $res=@mysql_query($sql) or die(mysql_error());
    $row=mysql_num_rows($res);
    if($row){
    	for($j=0;$j<$row;$j++){
    		$dbrow=mysql_fetch_array($res);
    		$ptype=$dbrow['ptype'];
    		$Timecost=$dbrow['Timecost'];
    		$Starlevel=$dbrow['Starlevel'];
    		$avgprice=$dbrow['avgprice'];
    		echo $ptype."&".$Timecost."&".$Starlevel."&".$avgprice."AND";
    	}
    }
    $sql="select sr.stype,sr.Timecost,sr.Starlevel,st.avgprice    
    from selftrans_route sr,self_trans st 
    where sr.route_id='$id' 
    and sr.stype=st.stype and sr.area=st.district";           //自助交通
    $res=@mysql_query($sql) or die(mysql_error());
    $row=mysql_num_rows($res);
    if($row){
    	for($j=0;$j<$row;$j++){
    		$dbrow=mysql_fetch_array($res);
    		$stype=$dbrow['stype'];
    		$Timecost=$dbrow['Timecost'];
    		$Starlevel=$dbrow['Starlevel'];
    		$avgprice=$dbrow['avgprice'];
    		echo $stype."&".$Timecost."&".$Starlevel."&".$avgprice."AND";
    	}
    	
    }
    echo "->";

}

function makeroute($departure,$destination){
	//echo "你进入了递归<br>";
	$sql="select r_end,route_id from routes where r_start='$departure';";
	//echo $sql;
	$res = @mysql_query($sql) or die(mysql_error());
    $row=mysql_num_rows($res);
	//echo $row;
    if($row){
    	//echo "长度大于1";
    	for($i=0;$i<$row;$i++){
    		//echo "进入循环";
    		global $ar,$len;
    		$dbrow=mysql_fetch_array($res);
    		$start=$dbrow['r_end'];
    		$id=$dbrow['route_id'];
    		if($start==$destination){
    			
                array_push($ar, $id);
                //print_r($ar);
    			echo $start."查找成功<br>";
    			return ;
    		}
    		//echo strncmp("日本-东京-上野公园", "日本-大阪-大阪城",10);     
    		if(strncmp($start, $destination,$len+1)==0){         //一个汉字对应3个长度
    			echo $start."->";
    			array_push($ar, $id);
                makeroute($start,$destination);
    		}
    		
    	}
    	//echo "1<br>";
    }
}

?>