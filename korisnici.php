<?php
$prosledjeno = $_REQUEST["q"];
file_put_contents('korisnici.json', $prosledjeno); 
?>