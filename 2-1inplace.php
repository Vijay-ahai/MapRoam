<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>查询界面</title>
</head>
<center>
<body>
<style>
        #b{
            width: 300px;
            text-align: right;        /*右对齐*/·
        }
    </style>
<?php
include "conn.php";//引用数据库连接文件 
echo "<br>输入你想去的地方，即刻出发<br><br><br>";
echo "<br>可以是国家，地区或景点哦~~<br><br><br>";
?>
<div id="b">
<form action="2-2findplace.php" method="post">  
           <input type="text" name="place"> <br> <br>
    <input type="submit" value="出发">  
</form> 
</div> 
</body>
</center>
</html>
