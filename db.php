<?php
$servername = "localhost";
$username = "root";  // default username for XAMPP
$password = "";      // default password for XAMPP (empty)
$dbname = "cake_shop"; // Name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
