<?php

include 'travel_conn.php';


//首先进行非空排错
/*if(!isset($_POST['number'])){
    die('number is not define');
}
if(!isset($_POST['start_time'])){
    die('start_time is not define');
}
if(!isset($_POST['end_time'])){
    die('end_time is not define');
}

$num=$_POST['number'];
$stime=$_POST['start_time'];
$etime=$_POST['end_time'];
$start=$_POST['l_start'];
$end=$_POST['l_end'];
$com=$_POST['company'];
$price=$_POST['avg_price'];
$speede=$_POST['avg_speede'];

if(empty($num)){
    die('num is empty');
}
if(empty($stime)){
    die('stime is empty');
}
if(empty($etime)){
    die('etime is empty');
}*/
//$rid="r001";
//$number="DP15";
//$starlevel="1";
$rid=$_GET['rid'];
$number=$_GET['number'];
$starlevel=$_GET['starlevel'];
//连接数据库
//connnetDb();

//执行类型转换，防止SQL注入
//$age=intval($age);
//插入数据

$str = "INSERT INTO lplan VALUES ('$rid','$number','-1','$starlevel');";
    $add = mysql_query($str) or die(mysql_error());
    if($add){
    	echo "插入成功";
    }
    else{
        echo "插入失败，请检查输入！";
    }

?>