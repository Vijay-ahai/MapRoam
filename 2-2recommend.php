<?php

include 'travel_conn.php';


//首先进行非空排错
/*if(!isset($_POST['aname'])){
    die('id is not define');
}*/

$name=$_GET['cdes'];
//$name="日本";
$sarray=array();
if(empty($name)){
    die('areaname is empty');
}
//根据得到的国家参数查询国家的3个景点
echo "地区为：";
$sql="select areaname from area where countryname='$name';";
$res=mysql_query($sql);
$row=mysql_num_rows($res);
if($row){
	for($i=0;$i<$row;$i++){
           if($i==3)
           	break;
           $dbrow=mysql_fetch_array($res);
           $area=$dbrow['areaname'];
           $area=substr($area, strlen($name)+1);
           array_push($sarray, $area);
           echo $area."&";
	}
	echo "<br>";
}
if(count($sarray)==0){
	echo "国家不存在！";
}
else{
	//查询对应景点路线
echo "路线为：";
for($i=0;$i<3;$i++){
	$area=$sarray[$i];
	$sql = "call 111_recomroutes('$area')";
  $result = mysql_query($sql);
//执行类型转换，防止SQL注入
//$age=intval($age);
//插入数据
   $sql = "select @str;";//
   $result = mysql_query($sql); //处理sql语
   while($row = mysql_fetch_array($result)){	 
    echo $row['@str']."&";   
   }
}
echo "<br>";
}


?>