<?php
    $dbhost = 'localhost:3306';
    $dbuser = 'epicoTest';
    $dbpass = 'proyecto2022';
    $dbname = 'poryecto2022';
    // Create connection
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    header('Access-Control-Allow-Origin: *');
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
?>