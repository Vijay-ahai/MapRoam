<?php
include "travel_conn.php";
?>
<?php
/*if(!isset($_POST['number'])){
    die('number is not define');
}
if(!isset($_POST['avg_price'])){
    die('avg_price is not define');
}



if(empty($num)){
    die('num is empty');
}
if(empty($price)){
    die('price is empty');
}
*/

$num=$_POST['number'];
$price=$_POST['price'];
//$num="DP15";
//$price="1";
//修改指定数据
	$str = "UPDATE `ltraffic` SET `avg_price`='$price' WHERE `number`='$num'";
    $add = mysql_query($str);
    if($add){
    	echo "修改成功！";
    }
?>