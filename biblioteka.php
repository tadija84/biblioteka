<?php
$prosledjeno = $_REQUEST["q"];
file_put_contents('knjige.json', $prosledjeno); 
?>