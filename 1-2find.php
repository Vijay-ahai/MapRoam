<?php
/////////////////////////////////
include "travel_conn.php";//引用数据库连接文件  
//首先进行非空排错  
/*if(!isset($_POST['phone'])){  
    die('phone is not define');  
} 
if(!isset($_POST['upassword'])){  
    die('upassword is not define');  
} 
///////////////////////////////////
if(empty($_POST['phone'])){  
    die('phone is empty');  
}  
if(empty($_POST['upassword'])){  
    die('upassword is empty');  
}*/ 

//$phone="13700000003";
//$upassword="123456";
$phone=$_POST['phone'];
$upassword=$_POST['pswd'];
//echo $phone."和".$upassword;
$str = "call 214_findusers('$phone','$upassword');";
$add = mysql_query($str);//处理数据语句！！

$sql = "select @str2;";//
$result = mysql_query($sql); //处理sql语
while($row = mysql_fetch_array($result)){	 
    echo $row['@str2'];   
}


?>
