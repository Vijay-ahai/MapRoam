
<?php
/////////////////////////////////
include "travel_conn.php";//引用数据库连接文件  
//首先进行非空排错  
if(!isset($_POST['phone'])){  
    die('phone is not define');  
} 
if(!isset($_POST['username'])){  
    die('username is not define');  
} 
if(!isset($_POST['upassword'])){  
    die('upassword is not define');  
} 
if(!isset($_POST['sex'])){  
    die('sex is not define');  
} 
if(!isset($_POST['city'])){  
    die('city is not define');  
} 
///////////////////////////////////
if(empty($_POST['phone'])){  
    die('phone is empty');  
}  
if(empty($_POST['username'])){  
    die('username is empty');  
} 
if(empty($_POST['upassword'])){  
    die('upassword is empty');  
}  
if(empty($_POST['sex'])){  
    die('sex is empty');  
} 
if(empty($_POST['city'])){  
    die('city is empty');  
} 
$phone=$_POST['phone'];
$username=$_POST['username'];
$upassword=$_POST['upassword'];
$sex=$_POST['sex'];
$city=$_POST['city'];
//echo $phone."+".$username."+".$upassword."+".$sex."+".$city;
$str = "call 214_addusers('$phone','$username','$upassword','$sex','$city');";
$add = mysql_query($str);//处理数据语句！！

$sql = "select @str1;";//
$result = mysql_query($sql); //处理sql语
while($row = mysql_fetch_array($result)){	 
    echo $row['@str1'];   
}


?>
