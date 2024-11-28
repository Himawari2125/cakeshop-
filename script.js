const sweets = document.getElementsByClassName("sweet-box");
const cupcakes = document.getElementsByClassName("cupcake-box");
const cakes = document.getElementsByClassName("cake-box");
const doughnuts = document.getElementsByClassName("doughnut-box");
const sweetButton = document.getElementById("sweet-button");
const cupcakeButton = document.getElementById("cupcake-button");
const cakeButton = document.getElementById("cake-button");
const doughnutButton = document.getElementById("doughnut-button");
const displayAllButton = document.getElementById("all");
const searchBar = document.getElementById("search-bar");
const addToCart = document.getElementsByClassName("add-to-cart");
const price = document.getElementsByClassName("price");
const cart = document.getElementById("cart");

const clearCart = document.getElementById("clear");

// Functions for the filters
function itemDisplay(item) {
  for (let i = 0; i < item.length; i++) {
    item[i].style.display = "block";
  }
}

function stopItemDisplay(item) {
  for (let i = 0; i < item.length; i++) {
    item[i].style.display = "none";
  }
}

function cakeFilter() {
  itemDisplay(cakes);
  stopItemDisplay(cupcakes);
  stopItemDisplay(sweets);
  stopItemDisplay(doughnuts);
}

function cupcakeFilter() {
  stopItemDisplay(cakes);
  itemDisplay(cupcakes);
  stopItemDisplay(sweets);
  stopItemDisplay(doughnuts);
}

function sweetFilter() {
  stopItemDisplay(cakes);
  stopItemDisplay(cupcakes);
  itemDisplay(sweets);
  stopItemDisplay(doughnuts);
}

function doughnutFilter() {
  stopItemDisplay(cakes);
  stopItemDisplay(cupcakes);
  stopItemDisplay(sweets);
  itemDisplay(doughnuts);
}

function allFilter() {
  itemDisplay(cakes);
  itemDisplay(cupcakes);
  itemDisplay(sweets);
  itemDisplay(doughnuts);
}

// Displaying the different filters via the buttons
function buttonFilter(item, filter) {
  item.addEventListener("click", filter);
}

function itemFilter() {
  buttonFilter(cakeButton, cakeFilter);
  buttonFilter(cupcakeButton, cupcakeFilter);
  buttonFilter(sweetButton, sweetFilter);
  buttonFilter(doughnutButton, doughnutFilter);
  buttonFilter(displayAllButton, allFilter);
}

// Displaying the different filters via the search bar
searchBar.addEventListener("input", textBarSearch);

function textBarSearch() {
  if (searchBar.value.toLowerCase() === "cakes") {
    return cakeFilter();
  } else if (searchBar.value.toLowerCase() === "cupcakes") {
    return cupcakeFilter();
  } else if (searchBar.value.toLowerCase() === "sweets") {
    return sweetFilter();
  } else if (searchBar.value.toLowerCase() === "doughnuts") {
    return doughnutFilter();
  } else if (searchBar.value.toLowerCase() === "all") {
    return allFilter();
  }
}

// Updating the cart display
function updateCart(cartData) {
  cart.innerText = `${cartData.itemNumber} Items - Rs ${cartData.totalPrice.toFixed(2)}`;
}

// Adding items to the cart via AJAX request
function addToBasket(num) {
  addToCart[num].addEventListener("click", function () {
    const item_name = addToCart[num].parentElement.querySelector('.confec-name').innerText;
    const item_price = parseFloat(price[num].innerText);

    // Send AJAX request to add item to cart
    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('item_name', item_name);
    formData.append('item_price', item_price);

    fetch('cart.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      updateCart(data); // Update the cart display
    })
    .catch(error => console.error('Error adding item to cart:', error));
  });
}

// Function to clear the shopping cart
function clearShoppingCart() {
  clearCart.addEventListener("click", function () {
    // Send AJAX request to clear the cart
    const formData = new FormData();
    formData.append('action', 'clear');

    fetch('cart.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      updateCart(data); // Update the cart display
    })
    .catch(error => console.error('Error clearing cart:', error));
  });
}

// Initializing functions on page load
itemFilter();
textBarSearch(); // Call this function to initialize the search bar filter
for (let i = 0; i < addToCart.length; i++) {
  addToBasket(i);
}
clearShoppingCart();
