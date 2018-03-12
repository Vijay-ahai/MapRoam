
<?php
/////////////////////////////////
include "travel_conn.php";//引用数据库连接文件 
ini_set("display_errors","Off");  
//首先进行非空排错  
/*if(!isset($_POST['place'])){  
    die('place is not define');  
} 
///////////////////////////////////
if(empty($_POST['place'])){  
    die('place is empty');  
}  */
$place=$_GET['cdes'];
//$place="日本";
$aarray=array();
$str = "call 214_findplaces('$place');";
$res = mysql_query($str) or die(mysql_error());//处理数据语句！！
$str= "select @ifis;";//
$result = mysql_query($str) or die(mysql_error()); //处理sql语
//$row = mysqli_fetch_array($result);
$row = mysql_fetch_array($result);
$choose=$row['@ifis'];
//echo $choose;
mysql_free_result($result);
if($choose=="输入信息有误")
	echo "无此国家或地区";
else{
	//echo $choose;
	$str = "call 214_showallsites('$choose');";
    $result = mysql_query($str) or die(mysql_error());//处理数据语句！！
   // echo "地区为：";
    $row=mysql_num_rows($result);
    //echo $row;
    if($row){  	
    	    for($i=0;$i<$row;$i++){
    		$dbrow=mysql_fetch_array($result);
    	    $aname=$dbrow['areaname'];
    	    $sname=$dbrow['sitename'];
    	    if(strncmp($aname,$sname,strlen($aname))==0){
    	    	$aarray[$aname]=$aarray[$aname].$sname."&";
    	    }
    	    else
    	    	//$sname=$dbrow['sitename'];
            $aarray[$aname]=$sname;
            //echo $aname."&";		
    	}
    }
    foreach ($aarray as $key => $value) {
    	echo $key."：".$value;
    	echo "<br>";
    }


}


//如果查询地点存在

 ?>
