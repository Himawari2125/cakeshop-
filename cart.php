<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

// Handle add to cart action
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] == 'add') {
        $itemName = $_POST['item_name'];
        $itemPrice = $_POST['item_price'];
        $sessionId = session_id();

        // Insert item into the database
        $stmt = $conn->prepare("INSERT INTO cart_items (item_name, item_price, session_id) VALUES (?, ?, ?)");
        $stmt->bind_param("sds", $itemName, $itemPrice, $sessionId);
        $stmt->execute();
        $stmt->close();

        // Return the updated cart data
        echo json_encode(getCartData());
    }
    elseif ($_POST['action'] == 'clear') {
        // Clear the cart from the database
        $sessionId = session_id();
        $stmt = $conn->prepare("DELETE FROM cart_items WHERE session_id = ?");
        $stmt->bind_param("s", $sessionId);
        $stmt->execute();
        $stmt->close();

        // Return the updated cart data (empty cart)
        echo json_encode(getCartData());
    }
}

// Handle view cart action (GET request)
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(getCartData());
}

// Function to get the current cart data
function getCartData() {
    global $conn;
    $sessionId = session_id();
    
    // Get all items in the cart for the current session
    $result = $conn->query("SELECT item_name, item_price FROM cart_items WHERE session_id = '$sessionId'");
    
    $items = [];
    $totalPrice = 0;
    
    while ($row = $result->fetch_assoc()) {
        $items[] = ['name' => $row['item_name'], 'price' => $row['item_price']];
        $totalPrice += $row['item_price'];
    }
    
    $itemCount = count($items);
    
    // Return the current cart data (item count, total price, and items list)
    return [
        'itemNumber' => $itemCount,
        'totalPrice' => $totalPrice,
        'items' => $items
    ];
}

$conn->close();
?>
