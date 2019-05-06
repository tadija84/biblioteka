<?php
$prosledjeno = $_REQUEST["q"];
file_put_contents('bibliotekari.json', $prosledjeno); 
?>